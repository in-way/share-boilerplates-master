import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

import App from './app';

function RouterConfig({ history, app }) {
    const Home = dynamic({
        app,
        component: () => import('./routes/Home')
    });

    const NotFound = dynamic({
        app,
        component: () => import('./routes/404')
    });

    const routes = [
        {
            key: 'index',
            path: '/',
            component: Home,
            exact: true
        },
        {
            key: 'notfound',
            path: '/404',
            component: NotFound,
            exact: true
        }
    ];

    return (
        <Router history={history}>
            <App>
                <Switch>{routes.map(route => <Route {...route} />)}</Switch>
            </App>
        </Router>
    );
}

export default RouterConfig;
