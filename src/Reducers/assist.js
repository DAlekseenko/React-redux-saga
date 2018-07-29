import {
    RECHARGE, SET_ASSIST_PARAMS, RECHARGE_INFO,
    START, SUCCESS, FAIL, FAILED
} from "../CONSTANTS"
import {OrderedMap, Record} from 'immutable'

import FieldsAttributesRecord from "./Entities/FieldsAttributesRecord"

export const assistState = Record({
    rechargeInfoLoading: false,
    rechargeInfoLoaded: false,
    rechargeLoading: false,
    fieldErrors: null,
    status: true,
    model: null,
    payServicesResult: false,
    withServices: false,
    orderNumber: null,
    directPay: true,
    error: null
})

const rechargeDialog = OrderedMap({
    first_name: new FieldsAttributesRecord,
    last_name: new FieldsAttributesRecord,
    email: new FieldsAttributesRecord
});

export default (state = new assistState(), action = {}) => {
    switch (action.type) {

        /** Получение инфо от ассиста */
        case RECHARGE_INFO + START:
            return state
                .set('rechargeInfoLoading', true)
                .set('rechargeInfoLoaded', false)
                .set('status', action.status)
                .set('orderNumber', action.orderNumber)

        case RECHARGE_INFO + SUCCESS:
            return state
                .set('rechargeInfoLoading', false)
                .set('rechargeInfoLoaded', true)
                .set('model', action.payload.code)
                .set('payServicesResult', action.payload.pay_services_result)
                .set('withServices', action.payload.with_services)

        case RECHARGE_INFO + FAIL:
            return state
                .set('rechargeInfoLoading', false)
                .set('rechargeInfoLoaded', false)
        /** Отправка данных в ассиста */
        case RECHARGE + START:
            return state
                .set('rechargeLoading', true)
                .set('fieldErrors', null)
                .set('error', null)

        case SET_ASSIST_PARAMS:
            return state
                .set('rechargeLoading', false)

        case RECHARGE + FAIL:
            return state
                .set('rechargeLoading', false)
                .set('fieldErrors', action.payload)

        case RECHARGE + FAILED:
            return state
                .set('rechargeLoading', false)
                .set('error', action.payload)

        default:
            return state;
    }
}