import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
    const App = dynamic({
        app,
        component: () => import('./App')
    });

    const routes = [
        {
            key: 'index',
            path: '/',
            component: App,
            exact: true
        }
    ];

    return (
        <Router history={history}>
            <Switch>{routes.map(route => <Route {...route} />)}</Switch>
        </Router>
    );
}

export default RouterConfig;
