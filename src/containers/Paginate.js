import React from 'react';
import {connect} from 'react-redux';

import Paginate from '../components/Paginate';
import {loadImage} from '../actions';

const mapStateToProps = (state, ownProps) => {
  if (state.pagination.image) {
    let {index, total} = state.pagination.image;
    return {...ownProps, index, total};
  }
  return ownProps;
};

export default connect(mapStateToProps)(Paginate);
