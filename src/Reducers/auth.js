import {
    SET_CURRENT_USER, LOGIN_USER, LOGOUT_CURRENT_USER, GET_BALANCE, SET_USER_DEVICE, SEND_CODE,
    START, SUCCESS, FAIL,
} from "../CONSTANTS"

import {Record} from 'immutable'

const userState = Record({
    user: null,
    errors: null,
    loading: false,
    balance: null,
    device: null
})

export default (state = new userState(), action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return state
                .set('user', action.payload)

        case LOGIN_USER + START:
        case SEND_CODE + START:
            return state
                .set('loading', true)
                .set('errors', null)
        case LOGIN_USER + SUCCESS:
            return state
                .set('user', action.payload.user)
                .set('loading', false)
        case LOGIN_USER + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)

        case SEND_CODE + SUCCESS:
            return state.set('loading', false)

        case SEND_CODE + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)

        case LOGOUT_CURRENT_USER:
            return state
                .set('user', null)

        case GET_BALANCE + START:
            return state
                .set('loading', true)
                .set('errors', null)
        case GET_BALANCE + SUCCESS:
            return state
                .set('loading', false)
                .set('balance', action.payload.value)
        case GET_BALANCE + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)
        case SET_USER_DEVICE:
            return state
                .set('device', action.payload)
        default:
            return state;
    }
}
