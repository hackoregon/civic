import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension";

export default function MockWrapper(App, Reducers, Routes = () => []) {
  const middlewares = [thunk, routerMiddleware(browserHistory)];

  const store = createStore(
    Reducers(),
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
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
