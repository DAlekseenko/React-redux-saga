import React from 'react'
import express from 'express'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { getStore } from './serverStore'
import LayoutFactory from '../../Services/Factories/LayoutFactory'
import routes from './routes'
import RouteManager from '../../Services/Route/RouteManager'
import ServerApiParamsContainer from '../../Services/Api/ServerApiParamsContainer'
import { configureServerSaga } from '../../Reducers/Sagas/rootSaga'

const router = express.Router();
const routeManager = new RouteManager(routes);

router.get('*', async (req, res) => {
    try {
        subProcess(req, res)
    } catch (err) {
        error(req, res, err)
    }
});

async function subProcess(req, res) {
    const ParamsContainer = new ServerApiParamsContainer(process.env.API_URL, req);
    const store = getStore();
    const Layout = LayoutFactory.getLayout();
    const Route = routeManager.findFirst(req.url);
    const context = {
        pageTitleSetter: (title) => Layout.setTitle(title),
        setNotFound: () => res.status(404)
    }
    ParamsContainer.setStore(store)
    Layout.setStore(store)

    await store.runSaga(configureServerSaga(req, res, Route, ParamsContainer)).done

    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                {routeManager.renderRoutes()}
            </StaticRouter>
        </Provider>
    )
    res.end(Layout.render(content))
}

function error(req, res, err) {
    if (err && err.response && err.response.status === 404) {
        res.redirect('/not-found');
    }
    console.log('App ERROR =>' , err);
    res.end(err)
}

export default router;
