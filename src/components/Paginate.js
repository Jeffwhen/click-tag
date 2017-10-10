import React from 'react';
import PropTypes from 'prop-types';

class Paginate extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }
  handlePrevClick(e) {
    e.preventDefault();
    let {loadData, index} = this.props;
    if (index - 1 >= 0) {
      this.props.onChange(index - 1);
    }
  }
  handleNextClick(e) {
    e.preventDefault();
    let {loadData, index, total} = this.props;
    if (index + 1 < total) {
      this.props.onChange(index + 1);
    }
  }
  render() {
    let {index, total} = this.props;
    if (typeof index === 'undefined' || !total) {
      return null;
    }
    let prevProps = {
      onClick: this.handlePrevClick.bind(this),
      disabled: index > 0 ? null : 'disabled'
    };
    let nextProps = {
      onClick: this.handleNextClick.bind(this),
      disabled: index < total - 1 ? null : 'disabled'
    };
    return (
      <div className="click-tag-paginate">
        <form className="click-tag-pagf">
          <button {...prevProps}>{'<-'}</button>
          <button {...nextProps}>{'->'}</button>
        </form>
      </div>
    );
  }
}

export default Paginate;
