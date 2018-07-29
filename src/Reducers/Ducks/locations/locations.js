import { appName } from '../../../config'

import { takeEvery, apply, put, select } from 'redux-saga/effects'
import LocationsStateEntity from './LocationsStateEntity'
import { userSelector } from '../auth/auth'
import { parentIdSelector, searchQuerySelector, fetchCategories } from '../categories/categories'
import { LOCATION_ID } from "../../../CONSTANTS";
import { MessageSetLocation, MessageGetLocation } from "../../../Services/Api/Messages";

/**
 * Constants
 * */
export const moduleName = 'locations'
const prefix = `${appName}/${moduleName}`

export const GET_LOCATIONS_REQUEST   = `${prefix}/GET_LOCATIONS_REQUEST`
export const GET_LOCATIONS_START     = `${prefix}/GET_LOCATIONS_START`
export const GET_LOCATIONS_SUCCESS   = `${prefix}/GET_LOCATIONS_SUCCESS`
export const CHANGE_LOCATION         = `${prefix}/CHANGE_LOCATION`
export const SET_LOCATION_REQUEST    = `${prefix}/SET_LOCATION_REQUEST`

export default function reducer(state = new LocationsStateEntity(), action) {
    const { type, payload } = action

    switch (type) {
        case GET_LOCATIONS_START:
            return state.loadingOn().setLocationId(payload)

        case GET_LOCATIONS_SUCCESS:
            return state.loadingOff().setLocations(payload.regions, payload.cities)

        case CHANGE_LOCATION:
            return state.loadingOff().setLocationId(payload)

        //case ERROR:
        //    return state
        //        .set('loading', false)
        default:
            return state
    }

}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */
const getLocationsBefore = (paramsContainer) => loadLocation(paramsContainer.getLocationId())

export function getLocations() {
    return {
        type: GET_LOCATIONS_REQUEST,
        method: MessageGetLocation.METHOD,
        beforeAC: getLocationsBefore,
        successAC: locationLoaded
    }
}
export function loadLocation(locationId) {
    return {
        type: GET_LOCATIONS_START,
        payload: locationId
    }
}
export function locationLoaded(response) {
    return {
        type: GET_LOCATIONS_SUCCESS,
        payload: response
    }
}
export function changeLocation(location_id) {
    return {
        type: CHANGE_LOCATION,
        payload: location_id,
    }
}
export function setUserLocation() {
    return {
        type: SET_LOCATION_REQUEST,
        method: MessageSetLocation.METHOD,
    }
}


/**
 * Sagas
 */
export function* sagas(cookieManager) {
    yield takeEvery(CHANGE_LOCATION, changeLocationSaga, cookieManager)
}

export function* changeLocationSaga(cookieManager, { payload }) {
    yield apply(cookieManager, cookieManager.set, [LOCATION_ID, payload, {expires: 9999}])

    const user = yield select( userSelector )
    if (user) {
        yield put(setUserLocation())
    }
    const id          = yield select( parentIdSelector )
    const searchQuery = yield select( searchQuerySelector )

    yield put(fetchCategories({id, searchQuery}))
}
