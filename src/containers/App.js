import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import pick from 'lodash/pick';

import Stage from './Stage';
import Monitor from './Monitor';
import Paginate from './Paginate';
import Submit from './Submit';
import Spinner from '../components/Spinner';
import {loadImage, resetErrorMessage} from '../actions';
import * as ActionTypes from '../actions';

import './App.css';

class App extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    storeIndex: PropTypes.number,
    total: PropTypes.number,
    errorMessage: PropTypes.object,
    resetErrorMessage: PropTypes.func.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    loadData: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
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
  renderMain() {
    if (!this.props.total) {
      return null;
    }
    let spinProps = pick(this.props, ['canvasWidth', 'canvasHeight']);
    return (
      <div>
        <div>
          <div className="click-tag-stage-container">
            <Stage />
            {this.props.isFetching ? <Spinner {...spinProps} /> : null}
          </div>
          <Monitor />
        </div>
        <Paginate onChange={this.handlePageChange} />
        <Submit onChange={this.handlePageChange} />
      </div>
    );
  }
  render() {
    return (
      <div className="click-tag-container">
        {this.renderErrorMessage()}
        {this.renderMain()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let paginate = state.pagination.image;
  const {imgWidth: canvasWidth, imgHeight: canvasHeight} = state.ui.stage;
  let newProps = {
    ...ownProps,
    canvasWidth, canvasHeight,
    errorMessage: state.errorMessage,
    storeIndex: paginate && paginate.index
  };
  if (state.pagination.image) {
    let {total, isFetching} = state.pagination.image;
    return {...newProps, total, isFetching};
  } else {
    return newProps;
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  index: parseInt(ownProps.match.params.index),
  loadData: index => dispatch(loadImage({index})),
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
