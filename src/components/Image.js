import React from 'react';
import PropTypes from 'prop-types';
import {Image, Rect, Group} from 'react-konva';

const strokeWidth = 2;
class BackImage extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    box: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired
    }).isRequired,
    scale: PropTypes.number.isRequired,
    imgId: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    description: PropTypes.string,
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired
  }
  state = {image: null}

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      const image = new window.Image();
      const {url} = nextProps;
      image.src = url;
      image.onload = () => this.setState({image});
    }
  }
  componentDidMount() {
    const image = new window.Image();
    const {url} = this.props;
    image.src = url;
    image.onload = () => this.setState({image});
  }
  render() {
    const {canvasWidth, canvasHeight, box, scale} = this.props;

    let imgProps = {width: canvasWidth, height: canvasHeight};
    let rectProps = {
      x: box.x * canvasWidth,
      y: box.y * canvasHeight,
      width: box.w * canvasWidth,
      height: box.h * canvasHeight,
      stroke: 'red',
      strokeWidth: strokeWidth / scale
    };
    return (
      <Group>
        <Image image={this.state.image} {...imgProps} />
        <Rect {...rectProps}/>
      </Group>
    );
  }
}

export default BackImage;
