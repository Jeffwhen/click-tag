import React from 'react';
import PropTypes from 'prop-types';
import {Layer, Rect} from 'react-konva';

const unscaledDotStroke = 3;
const pointShape = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
  ikey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});
class Board extends React.Component {
  static propTypes = {
    setPoint: PropTypes.func.isRequired,
    selPoint: PropTypes.func.isRequired,
    imgWidth: PropTypes.number.isRequired,
    imgHeight: PropTypes.number.isRequired,
    ikey: PropTypes.string.isRequired,
    scaleBox: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired
    }).isRequired,
    next: PropTypes.number.isRequired,
    points: PropTypes.arrayOf(pointShape).isRequired,
    scale: PropTypes.number.isRequired
  }
  onClick(event) {
    let stage = event.target.getStage();
    const {
      setPoint, selPoint, imgWidth, imgHeight, ikey, scaleBox, next
    } = this.props;
    let {x, y} = stage.getPointerPosition();
    x /= imgWidth;
    y /= imgHeight;
    x = scaleBox.x + x * scaleBox.w;
    y = scaleBox.y + y * scaleBox.h;
    setPoint({ikey, x, y});
    selPoint(next);
  }
  render() {
    let {imgWidth, imgHeight, points, scale} = this.props;
    let rectProps = {width: imgWidth, height: imgHeight};
    let dotStroke = unscaledDotStroke / scale;
    let lovedDots = points.map(p => {
      let props = {
        width: dotStroke * 2,
        height: dotStroke * 2,
        x: p.x * imgWidth - dotStroke,
        y: p.y * imgHeight - dotStroke,
        stroke: 'green',
        strokeWidth: dotStroke
      };
      return <Rect key={p.ikey} {...props} />;
    });
    return (
      <Layer>
        {lovedDots}
        <Rect {...rectProps} onClick={this.onClick.bind(this)} />
      </Layer>
    );
  }
}

export default Board;
