import React from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput';

class Paginate extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    total: PropTypes.number,
    error: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }
  handlePrevClick = e => {
    e.preventDefault();
    let {index} = this.props;
    if (index - 1 >= 0) {
      this.props.onChange(index - 1);
    }
  }
  handleNextClick = e => {
    e.preventDefault();
    let {index, total} = this.props;
    if (index + 1 < total) {
      this.props.onChange(index + 1);
    }
  }
  handleInputChange = text => {
    let value = parseInt(text, 10);
    const {onChange, error, total} = this.props;
    if (isNaN(value)) {
      error(`非法输入 ${text}`);
    } else if (value < 0 || (total && value > total)) {
      error(`超出的页码 ${text}`);
    } else {
      onChange(value - 1);
    }
  }
  render() {
    let {index, total} = this.props;
    if (typeof index === 'undefined' || !total) {
      return null;
    }
    let prevProps = {
      onClick: this.handlePrevClick,
      disabled: index > 0 ? null : 'disabled'
    };
    let nextProps = {
      onClick: this.handleNextClick,
      disabled: index < total - 1 ? null : 'disabled'
    };
    let inputProps = {
      placeholder: index + 1,
      onChangeText: this.handleInputChange
    };
    return (
      <div className="click-tag-paginate">
        <button {...prevProps}>{'<-'}</button>
        <TextInput {...inputProps} />
        <button {...nextProps}>{'->'}</button>
      </div>
    );
  }
}

export default Paginate;
