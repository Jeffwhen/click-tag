import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';
import App from './App';

const Root = ({store}) => (
  <Provider store={store}>
    <div>
      <Switch>
        <Route path="/:index" component={App} />
        <Redirect from="*" to="/0" />
      </Switch>
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
