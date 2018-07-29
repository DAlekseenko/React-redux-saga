import { appName } from '../../../config'
//import { createSelector } from 'reselect'
import {  } from 'redux-saga/effects'

import CategoriesStateEntity from './CategoriesStateEntity'

import { MessageSearchCategories, MessageGetCategories, MessageSearchAutoCompleteCategories } from '../../../Services/Api/Messages'
import { logout } from '../auth/auth'

/**
 * Constants
 * */
export const moduleName = 'categories'
const prefix = `${appName}/${moduleName}`

export const GET_CATEGORIES_REQUEST = `${prefix}/GET_CATEGORIES_REQUEST`
export const GET_CATEGORIES_START = `${prefix}/GET_CATEGORIES_START`
export const GET_CATEGORIES_FAIL = `${prefix}/GET_CATEGORIES_FAIL`
export const GET_CATEGORIES_SUCCESS = `${prefix}/GET_CATEGORIES_SUCCESS`

export const AUTOCOMPLETE_REQUEST = `${prefix}/AUTOCOMPLETE_REQUEST`
export const AUTOCOMPLETE_START = `${prefix}/AUTOCOMPLETE_START`
export const AUTOCOMPLETE_SUCCESS = `${prefix}/AUTOCOMPLETE_SUCCESS`
export const AUTOCOMPLETE_RESET = `${prefix}/AUTOCOMPLETE_RESET`

/**
 * Reducer
 * */
export default function reducer(state = new CategoriesStateEntity(), action) {
    const { type, payload } = action

    switch (type) {
        case GET_CATEGORIES_REQUEST:
            return state.setSearchValue(payload.searchQuery)

        case GET_CATEGORIES_START:
            return state.loadingOn().clearAutocomplete()

        case GET_CATEGORIES_FAIL:
            return state.loadingOff()

        case GET_CATEGORIES_SUCCESS:
            const {data, count_categories, count_services, target_category_path} = payload
            return state.loadingOff().setEntities(data).setPath(target_category_path).setCounters(count_categories, count_services)

        case AUTOCOMPLETE_START:
            return state.autoCompleteLoadingOn().set('autoCompleteWorks', true)

        case AUTOCOMPLETE_SUCCESS:
            return state.autoCompleteLoadingOff().setAutoCompleteEntities(payload.categories, payload.services)

        case AUTOCOMPLETE_RESET:
            return state.setSearchValue(payload)
                .set('autoCompleteDetected', [])

        default:
            return state
    }
}

/**
 * Selectors
 * */

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {string}
 */
export const searchQuerySelector = (state) => state[moduleName].getSearchQuery()

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {string|null}
 */
export const parentIdSelector = (state) => state[moduleName].getParentId()

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {boolean}
 */
export const loadingSelector = (state) => state[moduleName].isLoading()

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {boolean}
 */
export const autoCompleteLoadingSelector = (state) => state[moduleName].isAutoCompleteLoading()

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {integer}
 */
export const categoriesCountSelector = (state) => state[moduleName].getCategoriesCount()

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {integer}
 */
export const servicesCountSelector = (state) => state[moduleName].getServicesCount()

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {boolean}
 */
export const autoCompleteWorksSelector = (state) => state[moduleName].isAutoCompleteWork()

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {ServiceEntity[]}
 */
export const autoCompleteServicesSelector = (state) => state[moduleName].getAutoCompleteServices()

/**
 * @param {CategoriesStateEntity[]} state
 * @returns {CategoryEntity[]}
 */
export const autoCompleteCategoriesSelector = (state) => state[moduleName].getAutoCompleteCategories()


/**
 * Action Creators
 * */
export function fetchCategories(params) {
    return {
        type: GET_CATEGORIES_REQUEST,
        method: params.searchQuery ? MessageSearchCategories.METHOD : MessageGetCategories.METHOD,
        payload: params,
        beforeAC: loadCategoriesStart,
        successAC: categoriesLoaded,
        dataLoadErrorAC: categoriesLoadingError,
        forbiddenErrorAC: logout,
        observedAs: GET_CATEGORIES_REQUEST
    }
}
export function loadCategoriesStart(paramsContainer) {
    return {
        type: GET_CATEGORIES_START
    }
}
export function categoriesLoadingError(xhr) {
    return {
        type: GET_CATEGORIES_FAIL
    }
}
export function categoriesLoaded(response) {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload: response
    }
}

export function loadAutoComplete(paramsContainer) {
    return {
        type: AUTOCOMPLETE_START,
    }
}
export function autoCompleteLoaded(response) {
    return {
        type: AUTOCOMPLETE_SUCCESS,
        payload: response
    }
}
export function resetAutoComplete(searchQuery) {
    return {
        type: AUTOCOMPLETE_RESET,
        payload: searchQuery
    }
}
export function autoCompleteSearch(value, category_id) {
    return {
        type: AUTOCOMPLETE_REQUEST,
        method: MessageSearchAutoCompleteCategories.METHOD,
        payload: {value, category_id},
        beforeAC: loadAutoComplete,
        successAC: autoCompleteLoaded,
    }
}


/**
 * Sagas
 */
