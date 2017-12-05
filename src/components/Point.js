import React from 'react';
import PropTypes from 'prop-types';

class Point extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    ikey: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    selected: PropTypes.bool,
    selPoint: PropTypes.func.isRequired
  }
  handleClick(ikey) {
    this.props.selPoint(ikey);
  }
  render() {
    let {name, ikey, selected} = this.props;
    let activeStyle = {
      borderColor: '#0366a6',
      boxShadow: '0 0 2px 1px'
    };
    let props = {
      style: selected ? activeStyle : null,
      onClick: this.handleClick.bind(this, ikey)
    };
    let divProps = {
      style: {margin: '6px 0'}
    };
    return (
      <div {...divProps}><button {...props}>{name}</button></div>
    );
  }
}

export default Point;
