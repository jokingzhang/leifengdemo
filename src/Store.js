import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk'

import { reducer as articleListReducer } from 'jscom/routes/ArticleList';
import { reducer as accountListReducer } from 'jscom/routes/AccountView';

const reducer = combineReducers({
    articleList: articleListReducer,
    accountList: accountListReducer
});

const middlewares = [thunkMiddleware];
const storeEnhancers = compose(
    applyMiddleware(...middlewares)
);

export default createStore(reducer, {}, storeEnhancers);

