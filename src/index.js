import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './Store';
import App from './App';

const render = Component => {   // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Route path="/" component={Component} />
            </Router>
        </Provider>
        ,
        document.getElementById('app')
    );
};

render(App);

if (module && module.hot) {
    module.hot.accept();
}

