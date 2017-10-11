import {CALL_API, Schemas} from '../middleware/api';

export const IMAGE_REQUEST = 'IMAGE_REQUEST';
export const IMAGE_SUCCESS = 'IMAGE_SUCCESS';
export const IMAGE_FAILURE = 'IMAGE_FAILURE';

const fetchImage = params => ({
  [CALL_API]: {
    types: [IMAGE_REQUEST, IMAGE_SUCCESS, IMAGE_FAILURE],
    params,
    schema: Schemas.IMAGE
  }
});

export const loadImage = (params) => (dispatch, getState) => {
  let {pagination} = getState();
  let isFetching = pagination.image && pagination.image.isFetching;
  if (isFetching) {
    return;
  }
  return dispatch(fetchImage(params));
};

export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const setErrorMessage = (error, level) => ({
  type: SET_ERROR_MESSAGE, error, level: level || 'error'
});
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
});

export const RESIZE_STAGE = 'RESIZE_STAGE';
export const resizeStage = ({maxWidth, maxHeight}) => ({
  maxWidth, maxHeight,
  type: RESIZE_STAGE
});

export const UPDATE_POINT_INDEX = 'UPDATE_POINT_INDEX';
const updatePointIndex = (attr) => ({
  ...attr,
  type: UPDATE_POINT_INDEX
});
export const selPoint = index => {
  return (dispatch, getState) => {
    let state = getState();

    var imgId = state.pagination.image.id;
    if (!imgId) throw new Error('invalid imgId');
    let image = state.entities.images[imgId];

    if (typeof index === 'number') {
      index = image.points[index];
      if (!index) throw new Error('invalid point index');
    }
    let point = state.entities.points[index];
    if (!point) throw new Error(`invalid point key ${index}`);
    index = image.points.indexOf(index);
    let total = image.points.length;
    if (point.ikey === state.pagination.point.id) {
      return;
    }
    dispatch(updatePointIndex({
      index, total, id: point.ikey
    }));
  };
};
export const UPDATE_POINT = 'UPDATE_POINT';
export const setPoint = ({ikey, x, y}) => ({
  type: UPDATE_POINT,
  response: {entities: {points: {
    [ikey]: {x, y}
  }}}
});
