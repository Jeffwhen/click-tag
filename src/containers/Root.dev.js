import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import DevTools from './DevTools';
import App from './App';
import {Route, Redirect, Switch} from 'react-router-dom';

const Root = ({store}) => (
  <Provider store={store}>
    <div>
      <Switch>
        <Route path="/:index" component={App} />
        <Redirect from="*" to="/0" />
      </Switch>
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
