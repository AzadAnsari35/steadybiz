import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { isDevelopment } from 'Helpers/utils';
import rootReducer from 'Reducers/';
//console.log('hh', isDevelopment());
const devTools = isDevelopment()
  ? composeWithDevTools(applyMiddleware(thunk))
  : applyMiddleware(thunk);
const store = createStore(rootReducer, devTools);

export default store;
