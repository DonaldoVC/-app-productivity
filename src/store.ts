import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '@reducers';

const composeEnhancers = compose();

/**
 * Create the store to save all the info declared in the reducers
 */
export default createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));
