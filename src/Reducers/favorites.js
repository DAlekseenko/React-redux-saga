import {
    GET_FAVORITES, ADD_FAVORITE, FAVORITE, UPDATE_FAVORITE, DELETE_FAVORITE, GET_FAVORITE_ITEM,
    START, SUCCESS, FAIL
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'
import {arrToMap} from "pbr-lib-front-utils/dateManipulation"
import {FavoritesRecord} from "./entities"


export const favoriteState = Record({
    favorites: new OrderedMap({}),
    loading: false,
    success: false,
    fail: false,
    errors: null,
    favorite: null
})

export default (state = new favoriteState(), action = {}) => {
    switch (action.type) {
        case GET_FAVORITES + START:
        case ADD_FAVORITE + START:
        case GET_FAVORITE_ITEM + START:
        case UPDATE_FAVORITE + START:
        case DELETE_FAVORITE + START:
            return state
                .set('errors', null)
                .set('loading', true)
                .set('success', false)
                .set('fail', false)
        case GET_FAVORITES + SUCCESS:
            return state
                .set('loading', false)
                .set('favorites', arrToMap(action.payload.list))
        case UPDATE_FAVORITE + SUCCESS:
        case ADD_FAVORITE + SUCCESS:
            return state
                .set('loading', false)
                .set('success', true)
        case ADD_FAVORITE + FAIL:
            return state
                .set('loading', false)
                .set('fail', true)
        case GET_FAVORITE_ITEM + SUCCESS:
            return state
                .set('loading', false)
                .set('favorite', new FavoritesRecord(action.payload))
        case FAVORITE + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)
        default:
            return state;
    }
}