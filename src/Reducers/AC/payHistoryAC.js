import {SET_HISTORY_ITEMS, SET_HISTORY_LIST, START, SUCCESS, FAIL, API_REQUEST_ACTION} from "../../CONSTANTS"
import * as msg from "../../Services/Api/Messages"
import {logoutCurrentUser} from "./authAC"
import {search} from "./commonAC"


export const historySetSearch = searchFields => dispatch => {
    dispatch(search(searchFields));
}

export const getPaymentsHistoryStart = (searchFields) => ({
    type: SET_HISTORY_LIST + START,
    payload: searchFields
})

export const getPaymentsHistorySuccess = response => ({
    type: SET_HISTORY_LIST + SUCCESS,
    payload: response
})

export const getHistoryList = params => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageGetHistory.METHOD,
    payload: params || {},
    beforeAC: (paramsContainer) => getPaymentsHistoryStart(params),
    successAC: getPaymentsHistorySuccess,
    forbiddenErrorAC: logoutCurrentUser,
    observedAs: SET_HISTORY_LIST
})

export const loadPaymentsHistoryItems = () => ({
    type: SET_HISTORY_ITEMS + START
})

export const paymentsHistoryItemsLoaded = response => ({
    type: SET_HISTORY_ITEMS + SUCCESS,
    payload: response
})

export const paymentsHistoryItemsFail = response => ({
    type: SET_HISTORY_ITEMS + FAIL,
    payload: response
})

export const getHistoryItems = params => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageGetHistoryItems.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => loadPaymentsHistoryItems(),
    successAC: paymentsHistoryItemsLoaded,
    badRequestAC: paymentsHistoryItemsFail,
})