import {appName} from '../../../config'

import TotalLogoutStateEntity from "./TotalLogoutStateEntity"
import {MessageTotalLogout} from "../../../Services/Api/Messages"
import {logout} from "../auth/auth"
import {put, takeEvery} from "redux-saga/effects"


/**
 * Constants
 */
export const moduleName = 'tools/totalLogout'
const prefix = `${appName}/${moduleName}`

export const TOTAL_LOGOUT_REQUEST = `${prefix}/TOTAL_LOGOUT_REQUEST`
export const TOTAL_LOGOUT_START = `${prefix}/TOTAL_LOGOUT_START`
export const TOTAL_LOGOUT_SUCCESS = `${prefix}/TOTAL_LOGOUT_SUCCESS`
export const TOTAL_LOGOUT_FAIL = `${prefix}/TOTAL_LOGOUT_FAIL`
export const TOTAL_LOGOUT_RESPONSE = `${prefix}/TOTAL_LOGOUT_RESPONSE`

/**
 * Reducer
 * @param state
 * @param action
 * @return {*}
 */
export default (state = new TotalLogoutStateEntity(), action = {}) => {
    switch (action.type) {
        case TOTAL_LOGOUT_START:
            return state
                .totalLogoutLoadingOn()
        case TOTAL_LOGOUT_SUCCESS:
            return state
                .totalLogoutLoadingOff()
        case TOTAL_LOGOUT_FAIL:
            return state
                .totalLogoutLoadingOff()
                .setTotalLogoutFail()
        default:
            return state;
    }
}

/**
 * Selectors
 */

/**
 * @param {TotalLogoutStateEntity[]} state
 * @return {boolean}
 */
export const loading = (state) => state[moduleName].getTotalLogoutLoading()

/**
 * @param {TotalLogoutStateEntity[]} state
 * @return {boolean}
 */
export const fail = (state) => state[moduleName].getTotalLogoutFail();

/**
 * Actions
 */
export const totalLogoutStart = () => ({
    type: TOTAL_LOGOUT_START
})

export const totalLogoutSuccess = () => ({
    type: TOTAL_LOGOUT_SUCCESS
})

export const totalLogoutFail = () => ({
    type: TOTAL_LOGOUT_FAIL
})

export const totalLogoutResponse = response => ({
    type: TOTAL_LOGOUT_RESPONSE,
    payload: response
})


export const totalLogout = () => ({
    type: TOTAL_LOGOUT_REQUEST,
    method: MessageTotalLogout.METHOD,
    beforeAC: totalLogoutStart,
    successAC: totalLogoutResponse,
    forbiddenErrorAC: logout
})

/**
 * Sagas
 */
export function* sagas() {
    yield takeEvery(TOTAL_LOGOUT_RESPONSE, totalLogoutHandler)
}

export function* totalLogoutHandler({payload}) {
    if (payload.value) {
        yield put(totalLogoutSuccess())
        yield put(logout())
    } else {
        yield put(totalLogoutFail())
    }
}
