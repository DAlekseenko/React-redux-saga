import { appName } from '../../../config'
import { Record } from 'immutable'
import { all, takeEvery, apply, put } from 'redux-saga/effects'
import * as msg from "../../../Services/Api/Messages";
import { TOKEN } from '../../../CONSTANTS'
import { push } from 'react-router-redux'
import { changeLocation } from '../locations/locations'
import {UserRecord} from "../../entities"

/**
 * Constantsa
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const GET_USER_REQUEST = `${prefix}/GET_USER_REQUEST`
export const GET_USER_SUCCESS = `${prefix}/GET_USER_SUCCESS`
export const GET_USER_FAIL = `${prefix}/GET_USER_FAIL`
export const LOGOUT = `${prefix}/LOGOUT`
export const SET_DEVICE = `${prefix}/SET_DEVICE`
export const SEND_CODE_REQUEST = `${prefix}/SEND_CODE_REQUEST`
export const SEND_CODE_SUCCESS = `${prefix}/SEND_CODE_SUCCESS`
export const SEND_CODE_FAIL = `${prefix}/SEND_CODE_FAIL`
export const LOGIN_USER_REQUEST = `${prefix}/LOGIN_USER_REQUEST`
export const LOGIN_USER_SUCCESS = `${prefix}/LOGIN_USER_SUCCESS`
export const LOGIN_USER_FAIL = `${prefix}/LOGIN_USER_FAIL`


/**
 * Reducer
 * */
const userState = Record({
    user: null,
    errors: null,
    loading: false,
    balance: null,
    device: null
})

export default function reducer(state = new userState(), action) {
    const { type, payload } = action

    switch (type) {
        case LOGIN_USER_REQUEST:
        case SEND_CODE_REQUEST:
            return state.set('loading', true).set('errors', null)

        case GET_USER_SUCCESS:
            return state
                .set('user', payload)

        case GET_USER_FAIL:
            return state
                .set('loading', false)
                .set('errors', payload)

        case LOGOUT:
            return state
                .set('user', null)

        case SET_DEVICE:
            return state
                .set('device', payload)
        case SEND_CODE_SUCCESS:
            return state.set('loading', false)

        case SEND_CODE_FAIL:
            return state
                .set('loading', false)
                .set('errors', payload)

        case LOGIN_USER_SUCCESS:
            return state
                .set('user', payload.user)
                .set('loading', false)

        case LOGIN_USER_FAIL:
            return state
                .set('loading', false)
                .set('errors', payload)

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const userSelector = (state) => state[moduleName].get('user')

/**
 * @description not yet implemented AuthStateRecordEntity
 * @param state
 */
export const userSelectorRecord = (state) => new UserRecord(state[moduleName].get('user'));

/**
 * Action Creators
 * */
export function getUserByToken() {
    return {
        type: GET_USER_REQUEST,
        method: msg.MessageGetUser.METHOD,
        successAC: setUser,
        serverErrorAC: loginFail,
        forbiddenErrorAC: logout
    }
}
function setUser(response) {
    return {
        type: GET_USER_SUCCESS,
        payload: response
    }
}
function loginFail(response) {
    return {
        type: GET_USER_FAIL,
        payload: {fields: response.result, msg: response.message}
    }
}
export function logout() {
    return {
        type: LOGOUT
    }
}

export function setDevice(device) {
    return {
        type: SET_DEVICE,
        payload: device
    }
}

export function sendCode(phone){
    return {
        type: SEND_CODE_REQUEST,
        method: msg.MessageSendPassword.METHOD,
        payload: {phone},
        successAC: sendCodeComplete,
        fieldErrorAC: sendCodeFail
    }
}

export function sendCodeComplete(response) {
    return {
        type: SEND_CODE_SUCCESS,
        payload: response
    }
}

export function sendCodeFail(response) {
    return {
        type: SEND_CODE_FAIL,
        payload: {fields: {'phoneForCode': response.message}, msg: response.message}
    }
}
/////
export function loginUserSuccess(response) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: response
    }
}

export function loginUserFail(response) {
    return {
        type: LOGIN_USER_FAIL,
        payload: {fields: response.result, msg: response.message}
    }
}

export function userLogin(params) {
    return {
        type: LOGIN_USER_REQUEST,
        method: msg.MessageLoginUser.METHOD,
        payload: params,
        successAC: loginUserSuccess,
        fieldErrorAC: loginUserFail
    }
}

/**
 * Sagas
 */
export function* sagas(cookieManager) {
    yield all([
        takeEvery(LOGIN_USER_SUCCESS, loginSaga, cookieManager),
        takeEvery(LOGOUT, logoutSaga, cookieManager)
    ])
}

export function* loginSaga(cookieManager, {payload: {authKey, user}}) {
    if (authKey) {
        yield apply(cookieManager, cookieManager.set, [TOKEN, authKey, {expires: 1}])
    }
    if (user.location_id) {
        yield put(changeLocation(user.location_id))
    }
}

export function* logoutSaga(cookieManager) {
    yield apply(cookieManager, cookieManager.remove, [TOKEN])
    yield put(push('/'))
}

