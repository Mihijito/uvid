import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

type RouterViewProps = {
  routes: RouteDef[],
  className?: string
}

const RouterView: React.FC<RouterViewProps> = ({ routes, className }: RouterViewProps) => (
  <div className={className}>
    <Switch>
      {routes.map((route: RouteDef) => (
        <Route path={route.path} key={route.path}>
          <route.component />
        </Route>
      ))}
    </Switch>
  </div>
);

export default RouterView;