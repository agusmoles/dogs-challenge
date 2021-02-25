import React, { FunctionComponent, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./containers/Home/Home"));

const routes = [{ path: "/", element: <Home /> }];

const App: FunctionComponent = () => (
  <Suspense fallback={<></>}>
    <Router>
      <Switch>
        {routes.map(({ path, element }, index) => (
          <Route key={index} exact path={path}>
            {element}
          </Route>
        ))}
      </Switch>
    </Router>
  </Suspense>
);

export default App;
