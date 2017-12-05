import React from 'react';
import PropTypes from 'prop-types';
import {Image, Group} from 'react-konva';
import url from 'url';

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
    const image = new window.Image();
    const {url, scaleBox} = nextProps;
    image.src = this.genURL(url, scaleBox);
    image.onload = () => this.setState({image});
  }
  componentDidMount() {
    const image = new window.Image();
    const {url, scaleBox} = this.props;
    image.src = this.genURL(url, scaleBox);
    image.onload = () => this.setState({image});
  }
  render() {
    const {canvasWidth, canvasHeight, scaleBox} = this.props;

    let imgProps = {
      x: canvasWidth * scaleBox.x,
      y: canvasHeight * scaleBox.y,
      width: canvasWidth * scaleBox.w,
      height: canvasHeight * scaleBox.h
    };
    return (
      <Group>
        <Image image={this.state.image} {...imgProps} />
      </Group>
    );
  }
}

export default BackImage;
