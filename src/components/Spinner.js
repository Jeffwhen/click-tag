import React from 'react';
import PropTypes from 'prop-types';
import gif from './loading.gif';

class Spinner extends React.Component {
  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired
  }
  state = {show: false}
  componentDidMount() {
    this.timmer = setTimeout(() => {
      this.setState({show: true});
      this.timmer = null;
    }, 300);
  }
  componentWillUnmount() {
    if (typeof this.timmer !== 'undefined') {
      clearTimeout(this.timmer);
    }
  }
  render() {
    const {canvasWidth, canvasHeight} = this.props;
    let divStyle = {
      width: `${canvasWidth}px`,
      height: `${canvasHeight}px`,
      display: 'inline-block',
      position: 'absolute',
      backgroundColor: 'rgba(211, 211, 211, 0.93)',
      left: 0,
      top: 0
    };
    let imgStyle = {
      position: 'absolute',
      margin: 'auto',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
    if (!this.state.show) {
      return null;
    }
    return (
      <div style={divStyle}>
        <img style={imgStyle} alt="spinner" src={gif} />
      </div>
    );
  }
}

export default Spinner;
