import {connect} from 'react-redux';

import Board from '../components/Board';
import {setPoint, selPoint} from '../actions';

const mapStateToProps = (state, ownProps) => {
  let {imgWidth, imgHeight} = state.ui.stage;
  try {
    var imgId = state.pagination.image.id;
    if (!imgId) throw new Error('invalid imgId');
  } catch (e) {
    return {...ownProps};
  }
  let ikey = state.pagination.point.id;
  let image = state.entities.images[imgId];
  let points = image.points.map(
    p => state.entities.points[p]
  ).filter(
    p => p.x
  );
  let scaleBox = state.ui.scaleBox;
  let scale = 1 / scaleBox.w;
  let next = (image.points.indexOf(ikey) + 1) % image.points.length;
  return {imgWidth, imgHeight, points, scale, ikey, scaleBox, next};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  setPoint: args => dispatch(setPoint(args)),
  selPoint: index => dispatch(selPoint(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
