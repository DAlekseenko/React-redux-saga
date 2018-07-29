import {
    RECHARGE, RECHARGE_INFO, SET_ASSIST_PARAMS,
    SUCCESS,
    START,
    FAIL,
    FAILED,
    API_REQUEST_ACTION
} from "../../CONSTANTS"

import * as msg from "../../Services/Api/Messages";
import {logoutCurrentUser} from "./authAC"

export const rechargeStart = () => ({
    type: RECHARGE + START,
})

export const rechargeSetAssistParams = response => ({
    type: SET_ASSIST_PARAMS,
    payload: response
})

export const rechargeFieldError = response => ({
    type: RECHARGE + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const rechargeServerError = ({message, error}, defaultError = 'Ошибка получения данных') => ({
    type: RECHARGE + FAILED,
    payload: message || error || defaultError
})


export const recharge = params => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageRecharge.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => rechargeStart(),
    successAC: rechargeSetAssistParams,
    forbiddenErrorAC: logoutCurrentUser,
    fieldErrorAC: rechargeFieldError,
    serverErrorAC: rechargeServerError
})

export const getRechargeInfoStart = (status, orderNumber) => ({
    type: RECHARGE_INFO + START,
    status,
    orderNumber
})

export const getRechargeInfoSuccess = response => ({
    type: RECHARGE_INFO + SUCCESS,
    payload: response
})

export const getRechargeInfoFail = () => ({
    type: RECHARGE_INFO + FAIL
})

export const getRechargeInfo = (params, status = true) => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageRechargeInfo.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => getRechargeInfoStart(status, params.ordernumber),
    successAC: getRechargeInfoSuccess,
    forbiddenErrorAC: logoutCurrentUser,
    dataLoadErrorAC: getRechargeInfoFail,
    serverErrorAC: getRechargeInfoFail
})



