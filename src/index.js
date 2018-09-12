import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import NotFound from './NotFound';
import { view as Home } from './routes/Home';
import { view as ArticleList } from './routes/ArticleList';

import store from './Store.js'

render(
    <Provider store={store}>
      <Router>
        <div>
            <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/articles">Articles</Link>
                </li>
                <li>
                  <Link to="/will-match">Will no Match</Link>
                </li>
            </ul>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/articles" component={ArticleList} />
              {/* when none of the above match, <NotFound> will be rendered */}
              <Route component={NotFound} />
            </Switch>
        </div>
      </Router>
    </Provider>,
    window.document.getElementById('app')
);


if (module && module.hot) {
  module.hot.accept();
}

