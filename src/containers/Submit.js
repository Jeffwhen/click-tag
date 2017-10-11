import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import pick from 'lodash/pick';

import {fetchImage, setErrorMessage} from '../actions';

class Submit extends React.Component {
  static propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      ikey: PropTypes.string.isRequired,
      x: PropTypes.number,
      y: PropTypes.number,
    })),
    index: PropTypes.number.isRequired,
    error: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }
  onClick = () => {
    const {index, error, submit} = this.props;
    let {points} = this.props;
    if (!points.every(p => p.x && p.y)) {
      error('标注不完整');
      return;
    }

    let objPoints = {};
    points.forEach(p => {objPoints[p.ikey] = pick(p, ['x', 'y']);});
    submit({index, points: objPoints});
    console.log(this.props.index);
  }
  render() {
    let props = {
      onClick: this.onClick
    };
    return (<button {...props}>提交</button>);
  }
}

const mapStateToProps = (state, ownProps) => {
  let {id: imgId, index} = state.pagination.image;
  let image = imgId && state.entities.images[imgId];
  let points = image && image.points;
  if (points) {
    let pointEntities = state.entities.points;
    points = points.map(p => pointEntities[p]);
  }
  return {...ownProps, points, index};
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  submit: params => dispatch(fetchImage(params)),
  error: e => dispatch(setErrorMessage(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
