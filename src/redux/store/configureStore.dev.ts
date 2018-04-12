import { createStore, applyMiddleware, compose } from 'redux';
// import devTools from 'redux-devtools';
// import { createLogger } from 'redux-logger';
// import { install as installLoop } from 'redux-loop';
// import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from 'redux/modules';
// import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

// import { composeWithDevTools } from 'redux-devtools-extension';

// const loggerMiddleware = createLogger();

export interface HotModule extends NodeModule {
  hot: {
    accept: (path: string, callback: () => void) => void;
  };
}
// const noop = (s: {}) => s;
// const composer = process.env.REACT_APP_REDUX_DEVTOOLS_EXTENSION === 'true' ? composeWithDevTools : compose;

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(
    thunk,
    // loggerMiddleware
  ),
);

const configureStore = (initialState: Object = {}) => {
  const store = createStore(rootReducer, initialState, enhancer);

  // begin periodically persisting the store
  // persistStore(store, {
  //   keyPrefix: 'PREFIX/PERSIST_STORE'
  // });
  if ((module as HotModule).hot) {
    (module as HotModule).hot.accept('../modules', () =>
      store.replaceReducer(rootReducer),
    );
  }

  return store;
};

export default configureStore;
