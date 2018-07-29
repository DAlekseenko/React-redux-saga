import {push} from 'react-router-redux'
import {SEARCH_EVENT, SET_OBSERVED} from "../../CONSTANTS"

export const search = data => ({
    type: SEARCH_EVENT,
    payload: data,
})

export const withHotReload = action => {
    action.hotReload = true;

    return action;
}

export const pushLocation = location => dispatch => dispatch(push(location))
