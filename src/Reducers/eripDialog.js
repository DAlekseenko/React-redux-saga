import {
    START, SUCCESS, FAIL, RESET, GET_SERVICE,
    DIALOG, FAILED, OVER, ERROR
} from "../CONSTANTS"


import {Record, List, Map} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'
import {DialogFieldsRecord, SubscriptionRecord} from "./entities"

const ReducerState = Record({
    service: null,
    errors: null,
    loading: false,
    dialogBlocks: new List(),
    summary: null,
    subscription: new Map(),
    mts_session: null,
    fault: null
})

export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case GET_SERVICE + START:
            return state.set('service', null)

        case GET_SERVICE + SUCCESS:
            return state.set('service', action.payload)

        case DIALOG + START:
            return state
                .set('loading', true)
                .set('uuid', null)
                .set('errors', null)
                .set('fault', null)
                .set('mts_session', null)
                .set('subscription', new Map())
                .set('dialogBlocks', new List())
        case DIALOG + RESET:
            return state
                .set('fault', null)
                .set('loading', true)
                .set('errors', null)
        case DIALOG + SUCCESS:
            const {mts_session, fields, summary, subscription} = action.payload;
            return state
                .set('mts_session', mts_session)
                .set('loading', false)
                .updateIn(['dialogBlocks'], list =>
                    list.push(Map({
                        fields: arrToMap(fields, DialogFieldsRecord, item => item.name),
                        summary: summary
                    })))
                .set('subscription', new SubscriptionRecord(subscription))
        case DIALOG + OVER:
            return state
                .set('loading', false)
        case DIALOG + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)
        case DIALOG + FAILED:
            return state
                .set('loading', false)
                .set('fault', action.payload.errors)
        case ERROR:
            return state
                .set('loading', false)
        default:
            return state;
    }
}
