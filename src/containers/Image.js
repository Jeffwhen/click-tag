import React from 'react';
import {connect} from 'react-redux';
import {Layer} from 'react-konva';

import Image from '../components/Image';

const ImageC = (props) => (
  <Layer>
    <Image {...props} />
  </Layer>
);

const mapStateToProps = (state, ownProps) => {
  let image = state.entities.images[state.pagination.image.id];
  let {imgWidth: canvasWidth, imgHeight: canvasHeight} = state.ui.stage;
  let scaleBox = state.ui.scaleBox;
  let scale = 1 / scaleBox.w;
  return {...image, ...ownProps, canvasWidth, canvasHeight, scale, scaleBox};
};

export default connect(mapStateToProps)(ImageC);
