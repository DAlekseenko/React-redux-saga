import {all, takeEvery, call, takeLatest, apply, put, select} from 'redux-saga/effects'

import ApiCaller from '../../Services/Api/ApiCaller'

import { hashSelector, setObserved } from '../Ducks/common'
import { GET_USER_REQUEST, SEND_CODE_REQUEST, LOGIN_USER_REQUEST } from '../Ducks/auth/auth'
import { GET_LOCATIONS_REQUEST, SET_LOCATION_REQUEST } from '../Ducks/locations/locations'
import { GET_CATEGORIES_REQUEST, AUTOCOMPLETE_REQUEST } from '../Ducks/categories/categories'
import {DESCRIPTION_REQUEST, SOCIAL_REQUEST, AGREEMENT_REQUEST} from "../Ducks/help/help"
import {CHANGE_PASSWORD_REQUEST} from "../Ducks/tools/passwordChange"
import {EDIT_PROFILE_REQUEST} from "../Ducks/tools/editProfile"
import {TOTAL_LOGOUT_REQUEST} from "../Ducks/tools/totalLogout"
import {CANCEL_SUBS_REQUEST} from "../Ducks/tools/cancelSubs"


/**
 * @param {ServerApiParamsContainer|ClientApiParamsContainer} ParamsContainer
 */
export default function* requestSaga(ParamsContainer) {
    yield all([
        takeEvery(GET_USER_REQUEST, fetch, ParamsContainer),
        takeEvery(SEND_CODE_REQUEST, fetch, ParamsContainer),
        takeEvery(LOGIN_USER_REQUEST, fetch, ParamsContainer),
        takeEvery(SET_LOCATION_REQUEST, fetch, ParamsContainer),

        takeEvery(DESCRIPTION_REQUEST, fetch, ParamsContainer),
        takeEvery(SOCIAL_REQUEST, fetch, ParamsContainer),
        takeEvery(AGREEMENT_REQUEST, fetch, ParamsContainer),
        takeEvery(CHANGE_PASSWORD_REQUEST, fetch, ParamsContainer),
        takeEvery(EDIT_PROFILE_REQUEST, fetch, ParamsContainer),
        takeEvery(TOTAL_LOGOUT_REQUEST, fetch, ParamsContainer),
        takeEvery(CANCEL_SUBS_REQUEST, fetch, ParamsContainer),

        takeLatest(GET_LOCATIONS_REQUEST, fetch, ParamsContainer),
        takeLatest(GET_CATEGORIES_REQUEST, fetch, ParamsContainer),
        takeLatest(AUTOCOMPLETE_REQUEST, fetch, ParamsContainer),
    ])
}

export function* fetch(paramsContainer, {method, payload, observedAs, hotReload, beforeAC, successAC, serverErrorAC, forbiddenErrorAC, badRequestAC, fieldErrorAC, dataLoadErrorAC}) {
    try {
        const apiCaller = new ApiCaller(method, payload, paramsContainer)

        const hash = yield select(hashSelector, observedAs)
        const message = yield apply(apiCaller, apiCaller.getMessage)
        const newHash = yield call(encodeMessage, message)

        if (!observedAs || hotReload || hash !== newHash) {
            if (beforeAC) {
                yield put(beforeAC(paramsContainer))
            }
            const res = yield apply(apiCaller, apiCaller.call)

            if (successAC) {
                yield put(successAC(res.data.result))
            }
            if (observedAs) {
                yield put(setObserved(observedAs, newHash))
            }
        }
    } catch (xhr) {
        const {response} = xhr;

        if (response) {
            if (response.status === 400 && badRequestAC) {
                yield put(badRequestAC(response.data))
            }
            if (response.status === 403 && forbiddenErrorAC) {
                yield put(forbiddenErrorAC(response.data))
            }
            if (response.status === 499 && fieldErrorAC) {
                yield put(fieldErrorAC(response.data))
            }
            if (response.status === 500 && serverErrorAC) {
                yield put(serverErrorAC(response.data))
            }
        } else if (dataLoadErrorAC) {
            yield put(dataLoadErrorAC(xhr))
        }
    }
}

export function encodeMessage(message) {
    return JSON.stringify(message);
}
