import {appName} from '../../../config'

import HelpStateEntity from "./HelpStateEntity"
import {MessageGetDescription, MessageGetSocial, MessageUserAgreement} from "../../../Services/Api/Messages"

/**
 * Constants
 */
export const moduleName = 'help'
const prefix = `${appName}/${moduleName}`

const DESCRIPTION_STATE_NAME = 'description';
const SOCIAL_STATE_NAME = 'social';
const AGREEMENT_STATE_NAME = 'agreement';

export const DESCRIPTION_REQUEST = `${prefix}/DESCRIPTION_REQUEST`
export const DESCRIPTION_START = `${prefix}/DESCRIPTION_START`
export const DESCRIPTION_SUCCESS = `${prefix}/DESCRIPTION_SUCCESS`

export const SOCIAL_REQUEST = `${prefix}/SOCIAL_REQUEST`
export const SOCIAL_START = `${prefix}/SOCIAL_START`
export const SOCIAL_SUCCESS = `${prefix}/SOCIAL_SUCCESS`

export const AGREEMENT_REQUEST = `${prefix}/USER_AGREEMENT_REQUEST`
export const AGREEMENT_START = `${prefix}/USER_AGREEMENT_START`
export const AGREEMENT_SUCCESS = `${prefix}/AGREEMENT_SUCCESS`

/**
 * Reducer
 */
export default (state = new HelpStateEntity(), action = {}) => {
    switch (action.type) {
        case DESCRIPTION_START:
        case SOCIAL_START:
        case AGREEMENT_START:
            return state.loadingOn()
        case DESCRIPTION_SUCCESS:
            return state
                .loadingOff()
                .setDocument(DESCRIPTION_STATE_NAME, action.payload)
        case SOCIAL_SUCCESS:
            return state
                .loadingOff()
                .setDocument(SOCIAL_STATE_NAME, action.payload)
        case AGREEMENT_SUCCESS:
            return state
                .loadingOff()
                .setDocument(AGREEMENT_STATE_NAME, action.payload)
        default:
            return state;
    }
}

/**
 * Selectors
 */

/**
 * @param {HelpStateEntity[]} state
 * @return {DocumentEntity}
 */
export const agreement = (state) => state[moduleName].getAgreement()

/**
 * @param {HelpStateEntity[]} state
 * @return {DocumentEntity}
 */
export const social = (state) => state[moduleName].getSocial()

/**
 * @param {HelpStateEntity[]} state
 * @return {DocumentEntity}
 */
export const description = (state) => state[moduleName].getDescription()

/**
 * @param state
 * @return {boolean}
 */
export const loading = (state) => state[moduleName].getLoading()

/**
 * Actions
 */
export const getDescriptionStart = () => ({
    type: DESCRIPTION_START
})

export const getDescriptionSuccess = response => ({
    type: DESCRIPTION_SUCCESS,
    payload: response
})

export const getDescription = () => ({
    type: DESCRIPTION_REQUEST,
    method: MessageGetDescription.METHOD,
    beforeAC: getDescriptionStart,
    successAC: getDescriptionSuccess,
    observedAs: DESCRIPTION_REQUEST
})

export const getSocialStart = () => ({
    type: SOCIAL_START
})

export const getSocialSuccess = response => ({
    type: SOCIAL_SUCCESS,
    payload: response
})

export const getSocial = () => ({
    type: SOCIAL_REQUEST,
    method: MessageGetSocial.METHOD,
    beforeAC: getSocialStart,
    successAC: getSocialSuccess,
    observedAs: SOCIAL_REQUEST
})

export const getAgreementStart = () => ({
    type: AGREEMENT_START,
})

export const getAgreementSuccess = response => ({
    type: AGREEMENT_SUCCESS,
    payload: response
})

export const getUserAgreement = () => ({
    type: AGREEMENT_REQUEST,
    method: MessageUserAgreement.METHOD,
    beforeAC: getAgreementStart,
    successAC: getAgreementSuccess,
    observedAs: AGREEMENT_REQUEST
})