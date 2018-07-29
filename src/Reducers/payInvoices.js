import {
    GET_RECHARGE_REQUIREMENT,
    GET_RECHARGE_MODEL,
    GET_RECHARGE_DIALOG,
    PAY_INVOICE,
    START,
    SUCCESS,
    FAIL
} from "../CONSTANTS"
import {OrderedMap, Record} from 'immutable'
import {arrToMap} from "pbr-lib-front-utils/dist/dateManipulation"
import {fieldsRechargeConverter} from "../Utils/helper"
import FieldsAttributesRecord from "./Entities/FieldsAttributesRecord"

export const payInvoiceState = Record({
    fields: new OrderedMap({}),
    teaser: {},
    directPay: null,
    requirementLoading: false,
    requirementLoaded: false,
    transactionUuids: null,
    requirementError: null,

    payInvoiceLoading: false,
    payInvoiceError: null,
    transactionsResult: null,

    rechargeModelLoading: false,
    rechargeModelError: null
})

const rechargeDialog = OrderedMap({
    first_name: new FieldsAttributesRecord,
    last_name: new FieldsAttributesRecord,
    email: new FieldsAttributesRecord
});

const rechargePhone = OrderedMap({
    first_name: new FieldsAttributesRecord,
    last_name: new FieldsAttributesRecord,
    email: new FieldsAttributesRecord,
    sum: new FieldsAttributesRecord
});


export default (state = new payInvoiceState(), action = {}) => {

    switch (action.type) {
        case GET_RECHARGE_REQUIREMENT + START:
            return state
                .set('requirementLoading', true)
                .set('requirementLoaded', false)
                .set('requirementError', null)
                .set('directPay', null)

        case GET_RECHARGE_REQUIREMENT + SUCCESS: {
            const {model: {fields}, teaser, direct_pay, transactions} = action.payload
            return state
                .set('requirementLoading', false)
                .set('transactionUuids', transactions.join(','))
                .set('fields', arrToMap(fieldsRechargeConverter(rechargeDialog, fields)))
                .set('teaser', teaser)
                .set('directPay', direct_pay)
        }
        case GET_RECHARGE_DIALOG: {
            const {advanced: {model: {fields}, teaser}, uuid} = action.payload
            console.log(uuid ,fields ,teaser);
            return state
                .set('requirementLoaded', true)
                .set('transactionUuids', uuid)
                .set('fields', arrToMap(fieldsRechargeConverter(rechargeDialog, fields)))
                .set('teaser', teaser)
        }
        case GET_RECHARGE_REQUIREMENT + FAIL:
            return state
                .set('requirementLoading', false)
                .set('requirementError', action.payload)

        case PAY_INVOICE + START:
            return state
                .set('payInvoiceLoading', true)
                .set('payInvoiceError', null)

        case PAY_INVOICE + SUCCESS:
            return state
                .set('payInvoiceLoading', false)
                .set('transactionsResult', action.payload.transactions)

        case PAY_INVOICE + FAIL:
            return state
                .set('payInvoiceLoading', false)
                .set('payInvoiceError', action.payload)

        case GET_RECHARGE_MODEL + START:
            return state
                .set('rechargeModelLoading', true)
                .set('rechargeModelError', null)

        case GET_RECHARGE_MODEL + SUCCESS:
            return state
                .set('rechargeModelLoading', false)
                .set('fields', arrToMap(fieldsRechargeConverter(rechargePhone, action.payload.fields)))

        case GET_RECHARGE_MODEL + FAIL:
            return state
                .set('rechargeModelLoading', false)
                .set('rechargeModelError', action.payload)

        default:
            return state;
    }
}