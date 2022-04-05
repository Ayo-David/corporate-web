import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';

import allReducers from './reducers';
import routes from './routes';

const middlewares = [thunk];

// Only use the redux-logger middleware in development
if (process.env.NODE_ENV === 'development') {
  // middlewares.push(createLogger());
}

const store = createStore(allReducers, applyMiddleware(...middlewares));

// Helper function that renders single route
const renderRoute = (route: any, props: any) => {
  window.scrollTo(0, 0); // Reset scroll to top
  return <route.component routeParams={props.match.params} />;
};

// Helper function that create all routes
const createRoutes = () =>
  routes.map((route) => route.dynamic ? (
    <Route
      key={route.path}
      path={route.path}
      component={route.component}
    />
  ) : (
    <Route
      exact={true}
      key={route.path}
      path={route.path}
      component={(props: any) => renderRoute(route, props)}
    />
  ));

const RemoveTrailingSlash = () => {
  let pathname = window.location.pathname;
  if (pathname !== '/' && /\/+$/.test(pathname)) {
    pathname = pathname.replace(/\/+$/, '') || '/';
    window.location.replace(pathname);
  }
  return null;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <RemoveTrailingSlash />
          <Switch>
            {createRoutes()}
            <Redirect to="/error404" />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;