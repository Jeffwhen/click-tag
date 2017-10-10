import fetch from 'isomorphic-fetch';
import {normalize, schema} from 'normalizr';
import omit from 'lodash/omit';

export const CALL_API = 'Call API';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8'
};

const Endpoint = '/image';
const ExtraParams = {};
const postApi = ({index}, schema) => {
  let params = JSON.stringify(Object.assign({index}, ExtraParams));
  return fetch(Endpoint, {
    method: 'POST', body: params, credentials: 'same-origin',
    headers
  }).then(
    res => res.json()
  ).then(json => {
    if (json.errcode) {
      return Promise.reject(json);
    }

    let {total} = json;
    return {...normalize(json, schema), total, index};
  });
};

const pointSchema = new schema.Entity('points', {}, {
  idAttribute: entity => entity.ikey,
  processStrategy: entity => {
    entity.ikey = entity.key;
    delete entity.key;
    return entity;
  }
});

const imageSchema = new schema.Entity('images', {points: [pointSchema]}, {
  idAttribute: img => img.imgId,
  processStrategy: entity => {
    let {box} = entity;
    let {uid} = box;
    entity.box = {
      x: box.xmin,
      y: box.ymin,
      w: box.xmax - box.xmin,
      h: box.ymax - box.ymin
    };
    if (uid !== undefined) {
      entity.box.uid = uid;
    }
    return omit(entity, ['errcode', 'total']);
  }
});

export const Schemas = {
  IMAGE: imageSchema
};

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {params} = callAPI;
  const {schema, types} = callAPI;

  if (typeof params === 'function') {
    params = params(store.getState());
  }
  if (typeof params !== 'object') {
    throw new Error('Specify a object as call api param');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({type: requestType}));

  return postApi(params, schema).then(
    response => next(actionWith({response, type: successType})),
    error => next(actionWith({
      type: failureType, error: error.message || 'Something bad happened'
    }))
  );
};
