import React from "react";
import { render } from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { createLogger } from "redux-logger";

export default function MockWrapper(App, Reducers, Routes = () => []) {
  const middlewares = [thunk, routerMiddleware(browserHistory), createLogger()];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
  const store = createStore(
    Reducers(),
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.asyncReducers = {};

  // Allow for hot module replacement when applicable (dev mode)
  if (module.hot) {
    module.hot.accept("./index.js", () => {
      const nextRootReducer = Reducers(store.asyncReducers);
      store.replaceReducer(nextRootReducer);
    });
  }

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
      return state.routing;
    }
  });

  const rootRoute = {
    path: "/",
    component: App,
    childRoutes: Routes(store)
  };

  const Wrapper = () => (
    <Provider store={store}>
      <Router history={history} routes={rootRoute} />
    </Provider>
  );

  render(<Wrapper />, document.getElementById("content"));
}
