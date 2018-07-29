import {
    SEND_MAIL, START, SUCCESS, FAIL, ERROR
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'


const ReducerState = Record({
    mailSection: new OrderedMap({}),
    loading: null,
    sectionID: null,
    sending: false
})

export default (state = new ReducerState(), action = {}) => {

    switch (action.type) {
        case SEND_MAIL + START:
            return state
                .set('sending', true)
                .set('sectionID', action.sectionID ? action.sectionID : 0)
                .set('mailSection', new OrderedMap({
                    [action.sectionID]: {success: false, errors: {}}
                }))
        case SEND_MAIL + SUCCESS:
            return state
                .set('sending', false)
                .setIn(['mailSection', state.get('sectionID')], {
                    success: action.payload.value
                })
        case SEND_MAIL + FAIL:
            return state
                .set('sending', false)
                .setIn(['mailSection', state.get('sectionID')], {
                    errors: action.payload
                })
        case ERROR:
            return state
                .set('loading', false)
        default:
            return state;
    }
}