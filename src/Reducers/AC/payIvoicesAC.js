import {
    GET_RECHARGE_REQUIREMENT, GET_RECHARGE_MODEL, GET_RECHARGE_DIALOG, PAY_INVOICE,
    SUCCESS, START, FAIL,
    API_REQUEST_ACTION,
} from "../../CONSTANTS"

import * as msg from "../../Services/Api/Messages";
import {logoutCurrentUser} from "./authAC"

export const rechargeRequirementStart = () => ({
    type: GET_RECHARGE_REQUIREMENT + START,
})

export const rechargeRequirementLoaded = response => ({
    type: GET_RECHARGE_REQUIREMENT + SUCCESS,
    payload: response
})

export const rechargeRequirementFail = ({message, error}, defaultError = 'Ошибка получения данных') => ({
    type: GET_RECHARGE_REQUIREMENT + FAIL,
    payload: message || error || defaultError
})

export const rechargeDialog = response => ({
    type: GET_RECHARGE_DIALOG,
    payload: response
})

export const getRechargeRequirement = params => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageGetRequirement.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => rechargeRequirementStart(),
    successAC: rechargeRequirementLoaded,
    forbiddenErrorAC: logoutCurrentUser,
    dataLoadErrorAC: rechargeRequirementFail,
    serverErrorAC: rechargeRequirementFail
})

export const payInvoiceStart = () => ({
    type: PAY_INVOICE + START,
})

export const payInvoiceLoaded = response => ({
    type: PAY_INVOICE + SUCCESS,
    payload: response
})

export const payInvoiceFail = ({message, error}, defaultError = 'Ошибка получения данных') => ({
    type: PAY_INVOICE + FAIL,
    payload: message || error || defaultError
})

export const payInvoice = params => ({
    type: API_REQUEST_ACTION,
    method: msg.MessagePayInvoice.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => payInvoiceStart(),
    successAC: payInvoiceLoaded,
    forbiddenErrorAC: logoutCurrentUser,
    dataLoadErrorAC: payInvoiceFail,
    serverErrorAC: payInvoiceFail
})

export const getRechargeModelStart = () => ({
    type: GET_RECHARGE_MODEL + START,
})

export const getRechargeModelSuccess = response => ({
    type: GET_RECHARGE_MODEL + SUCCESS,
    payload: response
})

export const getRechargeModelFail = ({message, error}, defaultError = 'Ошибка получения данных') => ({
    type: GET_RECHARGE_MODEL + FAIL,
    payload: message || error || defaultError
})

export const getRechargeModel = () => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageGetRechargeModel.METHOD,
    beforeAC: (paramsContainer) => getRechargeModelStart(),
    successAC: getRechargeModelSuccess,
    forbiddenErrorAC: logoutCurrentUser,
    serverErrorAC: getRechargeModelFail,
    observedAs: GET_RECHARGE_MODEL
})