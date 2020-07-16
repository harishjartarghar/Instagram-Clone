import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducers from './reducers/authReducers';
import postReducers from './reducers/postReducers';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
           auth:authReducers,
           post:postReducers
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
