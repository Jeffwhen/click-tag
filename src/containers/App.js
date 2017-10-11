import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Stage from './Stage';
import Monitor from './Monitor';
import Paginate from './Paginate';
import Submit from './Submit';
import {loadImage, resetErrorMessage} from '../actions';
import * as ActionTypes from '../actions';

class App extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    storeIndex: PropTypes.number,
    total: PropTypes.number,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired
  }
  handlePageChange = index => {
    this.props.history.push(`/${index}`);
  }
  componentWillMount() {
    if (this.props.index < 0) {
      this.props.history.push('/0');
      return;
    }
    this.props.loadData(this.props.index);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.total && nextProps.index > this.props.total) {
      this.props.history.push(`/${this.props.total}`);
      return;
    }
    if (nextProps.index < 0) {
      this.props.history.push('/0');
      return;
    }

    if (nextProps.storeIndex === this.props.index + 1
        && nextProps.index === this.props.index
        && this.props.index === this.props.storeIndex) {
      // Submit
      this.props.history.push(`/${nextProps.storeIndex}`);
      return;
    }
    if (this.props.index + 1 === this.props.storeIndex
        && this.props.storeIndex === nextProps.index
        && nextProps.index === nextProps.storeIndex) {
      // Path change after submit
      return;
    }

    if (nextProps.index !== this.props.index) {
      this.props.loadData(nextProps.index);
    }
  }
  handleDismissClick = e => {
    this.props.resetErrorMessage();
    e.preventDefault();
  }
  renderErrorMessage() {
    const {errorMessage} = this.props;
    if (!errorMessage) {
      return null
    }
    const colorMap = {
      info: 'green',
      error: '#e99'
    };
    const {error, level} = errorMessage;
    const style = {
      backgroundColor: colorMap[level] || '#e99',
      padding: 10
    };
    return (
      <p style={style}>
        <b>{error}</b>
        {' '}
        <button onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </p>
    )
  }
  render() {
    return (
      <div>
        {this.renderErrorMessage()}
        <Stage />
        <Monitor />
        <Paginate onChange={this.handlePageChange} />
        <Submit onChange={this.handlePageChange} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let paginate = state.pagination.image;
  let newProps = {
    ...ownProps,
    errorMessage: state.errorMessage,
    storeIndex: paginate && paginate.index
  };
  if (state.pagination.image) {
    let {total} = state.pagination.image;
    return {...newProps, total};
  } else {
    return newProps;
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  index: parseInt(ownProps.match.params.index),
  loadData: index => dispatch(loadImage(index)),
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
