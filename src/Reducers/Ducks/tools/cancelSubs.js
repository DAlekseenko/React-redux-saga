import {appName} from '../../../config'

import CancelSubsStateEntity from "./CancelSubsStateEntity"
import {MessageDelSubscription} from "../../../Services/Api/Messages"
import {logout} from "../auth/auth"

import {put, takeEvery} from "redux-saga/effects"

/**
 * Constants
 */
export const moduleName = 'tools/cancelSuns'
const prefix = `${appName}/${moduleName}`

export const CANCEL_SUBS_REQUEST = `${prefix}/CANCEL_SUBS_REQUEST`
export const CANCEL_SUBS_START = `${prefix}/CANCEL_SUBS_START`
export const CANCEL_SUBS_SUCCESS = `${prefix}/CANCEL_SUBS_SUCCESS`
export const CANCEL_SUBS_RESPONSE = `${prefix}/CANCEL_SUBS_RESPONSE_HANDLER`
export const CANCEL_SUBS_FAIL = `${prefix}/CANCEL_SUBS_FAIL`

/**
 * Reducer
 * @param state
 * @param action
 * @return {*}
 */
export default (state = new CancelSubsStateEntity(), action = {}) => {
    switch (action.type) {
        case CANCEL_SUBS_START:
            return state.cancelSubsOn()
        case CANCEL_SUBS_SUCCESS:
            return state
                .cancelSubsOff()
                .setSubsCanceled()
        case CANCEL_SUBS_FAIL:
            return state
                .cancelSubsOff()
                .setCancelSubsFail()
        default:
            return state;
    }
}

/**
 * Selectors
 */

/**
 * @param {CancelSubsStateEntity[]} state
 * @return {boolean}
 */
export const loading = (state) => state[moduleName].cancelSubsLoading()

/**
 *  @param {CancelSubsStateEntity[]} state
 * @return {boolean}
 */
export const fail = (state) => state[moduleName].getCancelSubsFail();

/**
 * @param {CancelSubsStateEntity[]}  state
 * @return {boolean}
 */
export const subsCanceled = (state) => state[moduleName].getSubsCanceled();

/**
 * Actions
 */

export const cancelSubscriptionStart = () => ({
    type: CANCEL_SUBS_START
})

export const cancelSubscriptionSuccess = () => ({
    type: CANCEL_SUBS_SUCCESS
})

export const cancelSubscriptionFail = () => ({
    type: CANCEL_SUBS_FAIL,
})

export const cancelSubscriptionResponse = response => ({
    type: CANCEL_SUBS_RESPONSE,
    payload: response
})

export const cancelSubscriptionRequest = () => ({
    type: CANCEL_SUBS_REQUEST,
    method: MessageDelSubscription.METHOD,
    beforeAC: cancelSubscriptionStart,
    successAC: cancelSubscriptionResponse,
    forbiddenErrorAC: logout
})

/**
 * Sagas
 */
export function* sagas() {
    yield takeEvery(CANCEL_SUBS_RESPONSE, cancelSubsHandler)
}

export function* cancelSubsHandler({payload}) {
    if (payload.value) {
        yield put(cancelSubscriptionSuccess())
    } else {
        yield put(cancelSubscriptionFail())
    }
}