import {
    SET_OBSERVED
} from "../CONSTANTS"

import {Record, Map} from 'immutable'

const ReducerState = Record({
    observed: new Map({})
})

export default (state = new ReducerState(), action = {}) => {

    switch (action.type) {
        case SET_OBSERVED:
            return state.setIn(['observed', action.payload.key],  action.payload.hash)
        default:
            return state;
    }
}