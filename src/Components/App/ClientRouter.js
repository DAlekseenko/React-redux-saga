import React from 'react';
import createSagaMiddleware from 'redux-saga'

import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux';
import {fromJSON} from 'transit-immutable-js';
import {getStore, history} from './clientStore';
import routes from './routes';
import RouteManager from '../../Services/Route/RouteManager'

import {SERVER_POST_URL} from "../../CONSTANTS"
import cookies from "js-cookie"
import { configureClientSaga } from '../../Reducers/Sagas/rootSaga'
import ClientApiParamsContainer from "../../Services/Api/ClientApiParamsContainer";
import accountMiddleware from '../../Middlewares/accountMiddleware'
import catchUserActionMiddleware from "../../Middlewares/catchUserActionMiddleware"

import eripDialogMiddleware from "../../Middlewares/eripDialogMiddleware"
import catchFavorite from "../../Middlewares/catchFavorite"
import catchAddFavorite from "../../Middlewares/catchAddFavorite"
import catchAssistRequestMiddleware from "../../Middlewares/catchAssistRequestMiddleware"

const routeManager = new RouteManager(routes);

export default () => {
    const url = location.protocol + '//' + location.host + SERVER_POST_URL;
    const paramsContainer = new ClientApiParamsContainer(url, cookies);

    const sagaMiddleware = createSagaMiddleware()

    const store = getStore(
        fromJSON(window.__INITIAL_STATE__),
        sagaMiddleware,
        // catchUserActionMiddleware(history, cookies),
        catchAssistRequestMiddleware,
        eripDialogMiddleware(history),
        catchAddFavorite,
        catchFavorite,
        accountMiddleware)

    paramsContainer.setStore(store);

    sagaMiddleware.run(configureClientSaga(paramsContainer, routeManager, window, cookies))

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {routeManager.renderRoutes()}
            </ConnectedRouter>
        </Provider>
    )
}
