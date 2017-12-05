import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import {combineReducers} from 'redux';
import paginate from './paginate';
import omit from 'lodash/omit';

const entities = (state={images: {}}, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};

const stageDefault = {
  maxWidth: 600, maxHeight: 600,
  imgWidth: 600, imgHeight: 600
};
const stage = (state=stageDefault, action) => {
  const scaleImage = ({imgWidth, imgHeight, maxWidth, maxHeight}) => {
    let maxRatio = maxWidth / maxHeight;
    if (imgWidth / imgHeight > maxRatio) {
      imgHeight *= maxWidth / imgWidth;
      imgHeight = Math.round(imgHeight);
      imgWidth = maxWidth;
    } else {
      imgWidth *= maxHeight / imgHeight;
      imgWidth = Math.round(imgWidth);
      imgHeight = maxHeight;
    }
    return {imgWidth, imgHeight};
  };
  const {type} = action;
  if (type === ActionTypes.IMAGE_SUCCESS) {
    let {entities, result} = action.response;
    let {width: imgWidth, height: imgHeight} = entities.images[result];
    let {maxWidth, maxHeight} = state;
    return {...state, ...scaleImage(
      {imgWidth, imgHeight, maxWidth, maxHeight}
    )};
  }

  if (type === ActionTypes.RESIZE_STAGE) {
    const {maxWidth, maxHeight} = action;
    let {imgWidth, imgHeight} = state;
    return {maxWidth, maxHeight, ...scaleImage(
      {imgWidth, imgHeight, maxWidth, maxHeight}
    )};
  }
  return state;
};

const boxPadding = 0.1;
const scaleBox = (state={x: 0, y: 0, w: 1, h: 1}, action) => {
  const {type} = action;
  if (type === ActionTypes.IMAGE_SUCCESS) {
    let {entities, result} = action.response;
    let {box, width, height} = entities.images[result];
    box = {...box};
    delete box.uid;

    box.x -= box.w * boxPadding / 2;
    box.y -= box.h * boxPadding / 2;
    box.w += box.w * boxPadding;
    box.h += box.h * boxPadding;

    box.x = Math.round(box.x * width);
    box.w = Math.round(box.w * width);
    box.y = Math.round(box.y * height);
    box.h = Math.round(box.h * height);

    const imgRatio = width / height;
    if (box.w / box.h > imgRatio) {
      let inc = Math.round(box.w / imgRatio) - box.h;
      box.h += inc;
      box.y -= inc / 2;
    } else {
      let inc = Math.round(box.h * imgRatio) - box.h;
      box.w += inc;
      box.x -= inc / 2;
    }

    box.x = box.x / width;
    box.w = box.w / width;
    box.y = box.y / height;
    box.h = box.h / height;

    Object.keys(box).forEach(k => {
      if (box[k] < 0) {
        box[k] = 0;
      } else if (box[k] > 1) {
        box[k] = 1;
      }
    });

    return {...state, ...box};
  }
  return state;
};

const ui = combineReducers({stage, scaleBox});

const errorMessage = (state=null, action) => {
  const {type, error, level} = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return {error, level};
  }

  return state;
};

const defaultPaginate = {isFetching: false, id: null, index: 0, total: 0};
const point = (state=defaultPaginate, action) => {
  if (action.type === ActionTypes.UPDATE_POINT_INDEX) {
    return {...state, ...omit(action, 'type')};
  } else if (action.type === ActionTypes.IMAGE_SUCCESS) {
    let imgId = action.response.result;
    let image = action.response.entities.images[imgId];
    let pointEntries = action.response.entities.points;
    let points = image.points.map(
      ikey => pointEntries[ikey]
    );
    let point = points.find(p => !p.x);
    let id = point ? point.ikey : image.points[0].id;
    let total = image.points.length;
    let index = points.indexOf(point);
    return {...state, index, id, total, isFetching: false};
  } else if (action.type === ActionTypes.IMAGE_REQUEST) {
    return {...state, isFetching: true};
  }
  return state;
};

const gPagination = paginate({
  mapActionToKey: () => 'image',
  types: [
    ActionTypes.IMAGE_REQUEST,
    ActionTypes.IMAGE_SUCCESS,
    ActionTypes.IMAGE_FAILURE
  ]
});
const pagination = (state={}, action) => ({
  ...gPagination(state, action),
  point: point(state.point, action)
});

const rootReducer = combineReducers({
  entities, errorMessage, pagination, ui
});

export default rootReducer;
