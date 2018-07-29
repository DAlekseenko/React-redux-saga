import {all} from 'redux-saga/effects'

import pageLoader from './pageLoader'
import requestSaga from './requestSaga'
import routeWatcherSaga from './routeWatcherSaga'
import {sagas as authSaga} from '../Ducks/auth/auth'
import {sagas as locationSaga} from '../Ducks/locations/locations'
import {sagas as editProfileSaga} from '../Ducks/tools/editProfile'
import {sagas as totalLogout} from '../Ducks/tools/totalLogout'
import {sagas as cancelSubs} from '../Ducks/tools/cancelSubs'

export function configureServerSaga(req, res, route, paramsContainer) {
    return function* () {
        yield all([
            requestSaga(paramsContainer),
            pageLoader(req, res, route),
        ])
    }
}

export function configureClientSaga(paramsContainer, routeManager, window, cookies) {
    return function* () {
        yield all([
            routeWatcherSaga(routeManager, window),
            authSaga(cookies),
            locationSaga(cookies),
            requestSaga(paramsContainer),
            editProfileSaga(),
            totalLogout(),
            cancelSubs()
        ])
    }
}
