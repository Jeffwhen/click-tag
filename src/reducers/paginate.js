const paginate = ({types, mapActionToKey}) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

  const updatePagination = (state={
    isFetching: false,
    index: 0,
    total: null,
    id: null
  }, action) => {
    switch (action.type) {
      case requestType:
        return {...state, isFetching: true};
      case successType:
        return {
          ...state,
          isFetching: false,
          total: action.response.total,
          id: action.response.result,
          index: action.response.index
        };
      case failureType:
        return {
          ...state,
          isFetching: false
        };
      default:
        break;
    }

    return state;
  };

  return (state={}, action) => {
    const key = mapActionToKey(action);
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action)
        };
      default:
        break;
    }
    return state;
  };
};

export default paginate;
