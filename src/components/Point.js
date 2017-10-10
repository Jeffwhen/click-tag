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
    return (
      <div>
        <button onClick={this.handleClick.bind(this, ikey)}>
          {name}
        </button>{selected ? '*' : null}
      </div>
    );
  }
}

export default Point;
