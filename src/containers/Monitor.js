import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Point from '../components/Point';
import {selPoint, setPoint} from '../actions';

const Monitor = ({points, selPoint, skipPoint, index}) => {
  points = points && points.map(p => ({...p, selPoint}));
  let skipProps = {
    style: {margin: '18px 0'},
    onClick: () => skipPoint(index)
  };
  return (
    <div className="click-tag-monitor">
      {points ? points.map(p => <Point {...p} key={p.ikey} />) : null}
      <button {...skipProps}>跳过</button>
    </div>
  );
};

Monitor.propTypes = {
  points: PropTypes.array,
  selPoint: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  skipPoint: PropTypes.func.isRequired
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
  let index = state.pagination.point.index;
  let points = image.points.map(p => (
    {...state.entities.points[p], selected: p === ikey}
  ));
  return {...ownProps, points, index};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  selPoint: ikey => dispatch(selPoint(ikey)),
  skipPoint: index => {
    dispatch(setPoint({ikey: index, x: -1, y: -1}));
    dispatch(selPoint(index + 1));
  },
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
