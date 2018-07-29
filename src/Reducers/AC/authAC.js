import {
    SET_CURRENT_USER, LOGOUT_CURRENT_USER, LOGIN_USER, GET_BALANCE,
    API_REQUEST_ACTION, SET_USER_DEVICE, CLOSED_TEASER, SEND_CODE,
    SUCCESS, START, FAIL
} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages";

export const setCurrentUser = response => ({
    type: SET_CURRENT_USER,
    payload: response
})



export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

export const getBalanceStart = () => ({
    type: GET_BALANCE + START
})

export const getBalanceSuccess = response => ({
    type: GET_BALANCE + SUCCESS,
    payload: response
})

export const getBalanceFail = ({message, error}, defaultError = 'Ошибка получения данных') => ({
    type: GET_BALANCE + FAIL,
    payload: message || error || defaultError
})

export const getBalance = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetBalance.METHOD,
    beforeAC: (paramsContainer) => getBalanceStart(),
    successAC: getBalanceSuccess,
    forbiddenErrorAC: logoutCurrentUser,
    serverErrorAC: getBalanceFail
})



export const setClosedTeaser = device => ({
    type: CLOSED_TEASER,
    payload: device
})
