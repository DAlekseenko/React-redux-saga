import {
    GET_FAVORITES, ADD_FAVORITE, UPDATE_FAVORITE, DELETE_FAVORITE, FAVORITE, API_REQUEST_ACTION,
    START, SUCCESS, FAIL, FAVORITE_DISTRIBUTOR, GET_FAVORITE_ITEM, SET_HISTORY_LIST
} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages";
import {logoutCurrentUser} from "./authAC"

export const getFavoritesStart = () => ({
    type: GET_FAVORITES + START,
})

export const getFavoritesSuccess = res => ({
    type: GET_FAVORITES + SUCCESS,
    payload: res
})

export const getFavorites = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetFavorites.METHOD,
    beforeAC: (paramsContainer) => getFavoritesStart(),
    successAC: getFavoritesSuccess,
    forbiddenErrorAC: logoutCurrentUser,
    observedAs: GET_FAVORITES
})

export const addFavoriteStart = () => ({
    type: ADD_FAVORITE + START,
})

export const addFavoriteSuccess = _ => ({
    type: ADD_FAVORITE + SUCCESS,
})

export const addFavoriteFail = _ => ({
    type: ADD_FAVORITE + FAIL,
})

export const favoriteFail = response => ({
    type: FAVORITE + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const addFavoriteDistributor = response => ({
    type: FAVORITE_DISTRIBUTOR,
    payload: response,
    successAC: addFavoriteSuccess,
    failAC: addFavoriteFail
})

export const addFavorite = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageAddFavorite.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => addFavoriteStart(),
    successAC: addFavoriteDistributor,
    fieldErrorAC: favoriteFail,
    forbiddenErrorAC: logoutCurrentUser,
})

export const updateFavoriteStart = () => ({
    type: UPDATE_FAVORITE + START,
})

export const updateFavoriteSuccess = res => ({
    type: UPDATE_FAVORITE + SUCCESS,
})

export const updateFavorite = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageUpdateFavorite.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => updateFavoriteStart(),
    successAC: updateFavoriteSuccess,
    fieldErrorAC: favoriteFail,
    forbiddenErrorAC: logoutCurrentUser,
})

export const deleteFavoriteStart = () => ({
    type: DELETE_FAVORITE + START,
})

export const deleteFavoriteSuccess = res => ({
    type: DELETE_FAVORITE + SUCCESS,
})

export const deleteFavorite = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageDelFavorite.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => deleteFavoriteStart(),
    successAC: deleteFavoriteSuccess,
    forbiddenErrorAC: logoutCurrentUser,
})

export const getFavoriteItemStart = () => ({
    type: GET_FAVORITE_ITEM + START,
})

export const getFavoriteItemSuccess = res => ({
    type: GET_FAVORITE_ITEM + SUCCESS,
    payload: res
})

export const getFavoriteItem = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetFavoriteItem.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => getFavoriteItemStart(),
    successAC: getFavoriteItemSuccess,
    forbiddenErrorAC: logoutCurrentUser,
})

