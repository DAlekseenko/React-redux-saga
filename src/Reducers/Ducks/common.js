import { appName } from '../../config'
import { Record, Map } from 'immutable'
import { createSelector } from 'reselect'
import {  } from 'redux-saga/effects'

/**
 * Constants
 * */
export const moduleName = 'common'
const prefix = `${appName}/${moduleName}`

export const SET_OBSERVED = `${prefix}/SET_OBSERVED`

/**
 * Reducer
 * */
const ReducerState = Record({
    observed: Map()
})

export default function reducer(state = new ReducerState(), action) {
    const { type, payload } = action

    switch (type) {
        case SET_OBSERVED:
            return state.setIn(['observed', payload.key],  payload.hash)
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const hashSelector = (state, key) => state[moduleName].get('observed').get(key)

/**
 * Action Creators
 * */
export const setObserved = (key, hash) => ({
    type: SET_OBSERVED,
    payload: {key, hash}
})
export const withHotReload = action => {
    action.hotReload = true;

    return action;
}

/**
 * Sagas
 */
