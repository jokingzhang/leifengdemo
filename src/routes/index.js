import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { view as Home } from './Home';
import { view as ArticleList } from './ArticleList';

const NotFound = props => (
    <h1>not found</h1>
);

export default () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/articles" component={ArticleList} />
        {/* when none of the above match, <NotFound> will be rendered */}
        <Route component={NotFound} />
    </Switch>
)
