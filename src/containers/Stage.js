import React from 'react';
import PropTypes from 'prop-types';
import {Stage} from 'react-konva';
import {connect} from 'react-redux';

import Image from './Image';
import Board from './Board';

const ImageStage = ({width, height, scaleBox}) => {
  let offset = scaleBox ? {
    x: scaleBox.x * width, y: scaleBox.y * height
  } : null;
  let stageProps = {width, height, offset};
  if (scaleBox) {
    stageProps.scaleX = 1 / scaleBox.w;
    stageProps.scaleY = 1 / scaleBox.h;
  }
  if (!width || !height) {
    return null;
  }
  return (
    <Stage {...stageProps}>
      <Image />
      <Board />
    </Stage>
  );
};

ImageStage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  let image = state.pagination.image && state.pagination.image.id;
  if (!image) {
    return ownProps;
  }
  image = state.entities.images[image];
  let {scaleBox} = state.ui;
  let {imgWidth, imgHeight} = state.ui.stage;
  return {width: imgWidth, height: imgHeight, scaleBox};
};

export default connect(mapStateToProps)(ImageStage);
