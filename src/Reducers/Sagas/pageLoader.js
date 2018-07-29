import { put, apply, take, select } from 'redux-saga/effects'
import { END } from 'redux-saga'
import { prepareParamsToRout } from "pbr-lib-front-utils/dist/queryStringHelper"

import { getUserByToken, userSelector, setDevice, GET_USER_SUCCESS, GET_USER_FAIL, LOGOUT } from '../Ducks/auth/auth'
import { getLocations } from '../Ducks/locations/locations'

/**
 *
 * @param req
 * @param res
 * @param {Route} Route
 */
export default function* pageLoader(req, res, Route) {
    yield put(getUserByToken())
    yield take([GET_USER_SUCCESS, GET_USER_FAIL, LOGOUT])

    const needAuth = Route.isAuthNeeded()
    const user     = yield select( userSelector )
    const device   = yield apply( req.mobileDetect, req.mobileDetect.getOs )

    if (needAuth && !user) {
        yield apply(res, res.redirect, ['/'])
    }
    yield put(setDevice(device))
    yield put(getLocations())

    for (let action of Route.executeFetchData([prepareParamsToRout]) ) {
        yield put(action);
    }

    yield put(END)
}
