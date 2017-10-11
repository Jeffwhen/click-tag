import React from 'react';
import {connect} from 'react-redux';

import Paginate from '../components/Paginate';
import {setErrorMessage} from '../actions';

const mapStateToProps = (state, ownProps) => {
  if (state.pagination.image) {
    let {index, total} = state.pagination.image;
    return {...ownProps, index, total};
  }
  return ownProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  error: e => dispatch(setErrorMessage(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
