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
  let scale = 1 / state.ui.scaleBox.w;
  return {...image, ...ownProps, canvasWidth, canvasHeight, scale};
};

export default connect(mapStateToProps)(ImageC);
