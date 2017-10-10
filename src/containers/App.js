import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Stage from './Stage';
import Monitor from './Monitor';
import Paginate from './Paginate';
import {loadImage} from '../actions';
import * as ActionTypes from '../actions';

class App extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    total: PropTypes.number,
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
    if (nextProps.index !== this.props.index) {
      console.log('reload');
      this.props.loadData(nextProps.index);
    }
  }
  render() {
    return (
      <div>
        <Stage />
        <Monitor />
        <Paginate onChange={this.handlePageChange} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.pagination.image) {
    let {total} = state.pagination.image;
    return {...ownProps, total};
  } else {
    return {...ownProps};
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  index: parseInt(ownProps.match.params.index),
  loadData: index => dispatch(loadImage(index)),
  ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
