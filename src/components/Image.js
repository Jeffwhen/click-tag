import React from 'react';
import PropTypes from 'prop-types';
import {Image, Rect, Group} from 'react-konva';
import url from 'url';

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
    scaleBox: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired
    }).isRequired,
    imgId: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    description: PropTypes.string,
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired
  }
  state = {image: null}

  genURL(iurl, scaleBox) {
    const baseURL = 'http://its.adkalava.com/admin/imgCut';
    let obj = new URL(baseURL);
    obj.query = {
      ...scaleBox,
      url: iurl
    };
    return url.format(obj);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      const image = new window.Image();
      const {url, scaleBox} = nextProps;
      image.src = this.genURL(url, scaleBox);
      image.onload = () => this.setState({image});
    }
  }
  componentDidMount() {
    const image = new window.Image();
    const {url, scaleBox} = this.props;
    image.src = this.genURL(url, scaleBox);
    image.onload = () => this.setState({image});
  }
  render() {
    const {canvasWidth, canvasHeight, box, scale, scaleBox} = this.props;

    let imgProps = {
      x: canvasWidth * scaleBox.x,
      y: canvasHeight * scaleBox.y,
      width: canvasWidth * scaleBox.w,
      height: canvasHeight * scaleBox.h
    };
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
