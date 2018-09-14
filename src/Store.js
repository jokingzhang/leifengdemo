import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunkMiddleware from 'redux-thunk'

import {reducer as articleListReducer} from 'jscom/routes/ArticleList';

const reducer = combineReducers({
  articleList: articleListReducer
});

const middlewares = [thunkMiddleware];
const storeEnhancers = compose(
  applyMiddleware(...middlewares)
);

export default createStore(reducer, {}, storeEnhancers);

