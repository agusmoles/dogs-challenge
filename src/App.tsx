import React, { FunctionComponent, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components";

const Home = lazy(() => import("./containers/Home/Home"));
const BreedPage = lazy(() => import("./containers/BreedPage/BreedPage"));
const MyTeam = lazy(() => import("./containers/MyTeam/MyTeam"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/my-team", element: <MyTeam /> },
  { path: "/:breed", element: <BreedPage /> },
];

const App: FunctionComponent = () => (
  <Suspense fallback={<></>}>
    <Navbar />
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
