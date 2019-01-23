import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

let composeEnhancers = process.env.NODE_ENV === 'dev' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null;

if (!composeEnhancers) {
  composeEnhancers = compose;
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
