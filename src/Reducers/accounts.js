import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'

import {
    FOCUS_SERVICE, CREATE_USER_DATA, GET_INVOICES, GET_BANNERS, CREATE_USER_DATA_WITH_BANNER, GET_USER_DATA,
    START, SUCCESS, FAIL, RESET, USER_DATA_SEARCH,
    ACCOUNTS_SLIDER_LOADED, ACCOUNTS_USER_DATA_LOADED, ACCOUNTS_INVOICES_LOADED, GET_INVOICE_USER_DATA
} from "../CONSTANTS";
import UserDataServiceEntity from "./Entities/UserDataServiceEntity"

const ReducerState = Record({
    slider: new OrderedMap({}),
    userData: new OrderedMap({}),
    loadingDataForSlider: null,
    error: null,
    success: null,
    allDivLoaded: 0b00000,

    services: new OrderedMap({}),
    categories: new OrderedMap({}),
    path: new OrderedMap({}),
    focusedService: null,
    searchLoading: false,
    searchRequest: {},
    searchError: null,

    createUserDataError: null,
    createUserDataLoading: false,

    invoices: new OrderedMap({}),

    invoiceUserData: null
})

export default (state = new ReducerState(), action = {}) => {

    switch (action.type) {
        case GET_BANNERS + START:
            return state;
        case GET_BANNERS + SUCCESS:
            return state.set('slider', arrToMap(action.payload.items)).set('allDivLoaded', state.get('allDivLoaded') | ACCOUNTS_SLIDER_LOADED)
        case CREATE_USER_DATA_WITH_BANNER + START:
            return state.set('loadingDataForSlider', action.payload.service_id).set('error', null).set('success', null)
        case CREATE_USER_DATA_WITH_BANNER + SUCCESS:
            return state.set('loadingDataForSlider', null).set('error', null).set('success', action.payload);
        case CREATE_USER_DATA_WITH_BANNER + FAIL:
            return state.set('loadingDataForSlider', null).set('error', action.payload);
        case CREATE_USER_DATA_WITH_BANNER + RESET:
            return state.set('loadingDataForSlider', null).set('error', null).set('success', null);

        case GET_USER_DATA + START:
            return state;
        case GET_USER_DATA + SUCCESS:
            return state.set('userData', arrToMap(action.payload.data)).set('allDivLoaded', state.get('allDivLoaded') | ACCOUNTS_USER_DATA_LOADED)

        case USER_DATA_SEARCH + START:
            return state.set('searchLoading', true).set('searchRequest', action.payload).set('searchError', null).set('focusedService', null)
        case USER_DATA_SEARCH + SUCCESS:
            const services   = action.payload.data.filter(item => item.is_category === false)
            const categories = action.payload.data.filter(item => item.is_category === true)

            return state
                .set('searchLoading', false)
                .set('services', arrToMap(services))
                .set('categories', arrToMap(categories))
                .set('searchError', null)
                .set('path', arrToMap(action.payload.target_category_path))

        case USER_DATA_SEARCH + FAIL:
            return state.set('searchLoading', false).set('searchError', action.payload)

        case FOCUS_SERVICE:
            const service = state.getIn(['services', action.payload])
            return state.set('focusedService', service).set('createUserDataError', null)

        case CREATE_USER_DATA + START:
            return state.set('createUserDataError', null).set('createUserDataLoading', true)
        case CREATE_USER_DATA + SUCCESS:
            return state.set('createUserDataLoading', false)
        case CREATE_USER_DATA + FAIL:
            return state.set('createUserDataError', action.payload).set('createUserDataLoading', false)

        case GET_INVOICES + START:
            return state
        case GET_INVOICES + SUCCESS:
            return state.set('invoices', arrToMap(action.payload.invoices)).set('allDivLoaded', state.get('allDivLoaded') | ACCOUNTS_INVOICES_LOADED)

        case GET_INVOICE_USER_DATA + START:
            return state.set('invoiceUserData', null)
        case GET_INVOICE_USER_DATA + SUCCESS:
            return state.set('invoiceUserData', new UserDataServiceEntity(action.payload))

    }
    return state
}
