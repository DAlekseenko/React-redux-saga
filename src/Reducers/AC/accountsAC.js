import {
    GET_BANNERS,
    SUCCESS,
    CREATE_USER_DATA_WITH_BANNER,
    CREATE_USER_DATA,
    GET_USER_DATA,
    GET_INVOICES,
    DELETE_USER_DATA,
    GET_INVOICE_USER_DATA,
    EDIT_USER_DATA,
    USER_DATA_SEARCH,
    FOCUS_SERVICE,
    START,
    FAIL,
    API_REQUEST_ACTION,
    RESET,
} from "../../CONSTANTS"

import * as msg from "../../Services/Api/Messages";
import {logoutCurrentUser} from "./authAC"


export function setBanners(result) {
    return {
        type: GET_BANNERS + SUCCESS,
        payload: result
    }
}

export function loadBanners() {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageGetSlider.METHOD,
        payload: {},
        successAC: setBanners,
        observedAs: GET_BANNERS
    }
}

export function startCreateUserDataUsingBanner(service_id) {
    return {
        type: CREATE_USER_DATA_WITH_BANNER + START,
        payload: {service_id}
    }
}

export function successCreateUserDataUsingBanner(service_id, text) {
    return {
        type: CREATE_USER_DATA_WITH_BANNER + SUCCESS,
        payload: {service_id, text}
    }
}

export function failCreateUserDataUsingBanner(service_id, text) {
    return {
        type: CREATE_USER_DATA_WITH_BANNER + FAIL,
        payload: {service_id, text}
    }
}

export function resetCreateUserDataUsingBanner() {
    return {
        type: CREATE_USER_DATA_WITH_BANNER + RESET,
        payload: null
    }
}

export function createUserDataUsingBanner(service_id, identifier, defaultSuccessText = 'Успешно', defaultError = 'Ошибка') {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageCreateUserData.METHOD,
        payload: {service_id, identifier},
        beforeAC: (paramsContainer) => startCreateUserDataUsingBanner(service_id),
        successAC: () => successCreateUserDataUsingBanner(service_id, defaultSuccessText),
        fieldErrorAC: (res) => failCreateUserDataUsingBanner(service_id, res.message || defaultError),
        serverErrorAC: (res) => failCreateUserDataUsingBanner(service_id, res.error || defaultError),
        dataLoadErrorAC: () => failCreateUserDataUsingBanner(service_id, defaultError),
    }
}

export function loadUserDataInit() {
    return {
        type: GET_USER_DATA + START,
        payload: null
    }
}

export function loadUserDataComplete(result) {
    return {
        type: GET_USER_DATA + SUCCESS,
        payload: result
    }
}

export function loadUserData() {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageGetUserData.METHOD,
        payload: null,
        beforeAC: (paramsContainer) => loadUserDataInit(),
        successAC: loadUserDataComplete,
        observedAs: GET_USER_DATA
    }
}

export function getCategoriesInit(params) {
    return {
        type: USER_DATA_SEARCH + START,
        payload: params
    }
}

export function getCategoriesComplete(result) {
    return {
        type: USER_DATA_SEARCH + SUCCESS,
        payload: result
    }
}

export function getCategoriesFail(errorText) {
    return {
        type: USER_DATA_SEARCH + FAIL,
        payload: errorText
    }
}

export const getCategories = params => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageGetCategories.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => getCategoriesInit(params),
    successAC: getCategoriesComplete,
    badRequestAC: (res) => getCategoriesFail(res.error)
    // dataLoadErrorAC: categoriesLoadingError,
    // forbiddenErrorAC: logoutCurrentUser
})

export const categoriesSearch = params => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageSearchCategories.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => getCategoriesInit(params),
    successAC: getCategoriesComplete,
    badRequestAC: (res) => getCategoriesFail(res.error)
    // dataLoadErrorAC: categoriesLoadingError
})

export function focusService(serviceId) {
    return {
        type: FOCUS_SERVICE,
        payload: serviceId
    }
}

/** ************** Create User Data ************ */

export function createUserDataInit() {
    return {
        type: CREATE_USER_DATA + START,
        payload: null,
    }
}

export function createUserDataComplete(result) {
    return {
        type: CREATE_USER_DATA + SUCCESS,
        payload: result
    }
}

export function createUserDataFail(errorText) {
    return {
        type: CREATE_USER_DATA + FAIL,
        payload: errorText
    }
}

export function createUserData(service_id, identifier, description, defaultError = 'Ошибка') {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageCreateUserData.METHOD,
        payload: {service_id, identifier, description},
        beforeAC: (paramsContainer) => createUserDataInit(),
        successAC: createUserDataComplete,
        fieldErrorAC: (res) => createUserDataFail(res.message || defaultError),
        serverErrorAC: (res) => createUserDataFail(res.error || defaultError),
        dataLoadErrorAC: () => createUserDataFail(defaultError),
    }
}

/** ************** Delete User Data ************ */

export function deleteUserDataComplete() {
    return {
        type: DELETE_USER_DATA + SUCCESS
    }
}

export function deleteUserData(id) {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageDeleteUserData.METHOD,
        payload: {id},
        successAC: deleteUserDataComplete
    }
}

/** ************** Edit User Data ************ */

export function editUserDataInit() {
    return {
        type: EDIT_USER_DATA + START,
        payload: null,
    }
}

export function editUserDataComplete(result) {
    return {
        type: EDIT_USER_DATA + SUCCESS,
        payload: result
    }
}

export function editUserDataFail(errorText) {
    return {
        type: EDIT_USER_DATA + FAIL,
        payload: errorText
    }
}

export function editUserData(id, identifier, description, defaultError = 'Ошибка') {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageEditUserData.METHOD,
        payload: {id, identifier, description},
        beforeAC: (paramsContainer) => editUserDataInit(),
        successAC: editUserDataComplete,
        fieldErrorAC: (res) => editUserDataFail(res.message || defaultError),
        serverErrorAC: (res) => editUserDataFail(res.error || defaultError),
        dataLoadErrorAC: () => editUserDataFail(defaultError),
    }
}

/** ************** Invoices List ************ */

export function loadInvoicesInit() {
    return {
        type: GET_INVOICES + START,
        payload: null,
    }
}

export function loadInvoicesComplete(result) {
    return {
        type: GET_INVOICES + SUCCESS,
        payload: result
    }
}

export function loadInvoices() {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageGetInvoices.METHOD,
        payload: null,
        beforeAC: (paramsContainer) => loadInvoicesInit(),
        successAC: loadInvoicesComplete
    }
}

/** ************** Invoice User Data By ID ************ */

export const getInvoiceStart = () => ({
    type: GET_INVOICE_USER_DATA + START,
})

export const getInvoiceSuccess = response => ({
    type: GET_INVOICE_USER_DATA + SUCCESS,
    payload: response
})

export const getInvoiceFail = ({message, error}, defaultError = 'Ошибка получения данных') => ({
    type: GET_INVOICE_USER_DATA + FAIL,
    payload: message || error || defaultError
})

export const getInvoiceUserData = (params) => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageGetInvoiceUserData.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => getInvoiceStart(),
    successAC: getInvoiceSuccess,
    forbiddenErrorAC: logoutCurrentUser,
    dataLoadErrorAC: getInvoiceFail,
})

