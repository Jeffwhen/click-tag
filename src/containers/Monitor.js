import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Point from '../components/Point';
import {selPoint} from '../actions';

const Monitor = ({points, selPoint}) => {
  points = points && points.map(p => ({...p, selPoint}));
  return (
    <div className="click-tag-monitor">
      {points ? points.map(p => <Point {...p} key={p.ikey} />) : null}
    </div>
  );
};

Monitor.propTypes = {
  points: PropTypes.array,
  selPoint: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  try {
    var imgId = state.pagination.image.id;
    if (!imgId) throw new Error('invalid imgId');
  } catch (e) {
    return {...ownProps};
  }
  let image = state.entities.images[imgId];
  let ikey = state.pagination.point.id;
  let points = image.points.map(p => (
    {...state.entities.points[p], selected: p === ikey}
  ));
  return {...ownProps, points};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  selPoint: ikey => dispatch(selPoint(ikey))
});

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
