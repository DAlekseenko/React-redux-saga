import {appName} from '../../../config';

import PasswordChangeStateEntity from "./PasswordChangeStateEntity"
import {MessageChangePassword} from "../../../Services/Api/Messages"
import {logout} from "../auth/auth"

/**
 * Constants
 */
export const moduleName = 'tools/passwordChange';
const prefix = `${appName}/${moduleName}`;

export const CHANGE_PASSWORD_REQUEST = `${prefix}/DESCRIPTION_REQUEST`;
export const CHANGE_PASSWORD_START = `${prefix}/CHANGE_PASSWORD_START`;
export const CHANGE_PASSWORD_SUCCESS = `${prefix}/CHANGE_PASSWORD_SUCCESS`;
export const CHANGE_PASSWORD_FIELDS_ERROR = `${prefix}/CHANGE_PASSWORD_FIELDS_ERROR`;

/**
 * Reducer
 * @param state
 * @param action
 * @return {*}
 */
export default (state = new PasswordChangeStateEntity(), action = {}) => {
    switch (action.type) {
        case CHANGE_PASSWORD_START:
            return state.passwordChangesOn();
        case CHANGE_PASSWORD_SUCCESS:
            return state
                .passwordChangesOff()
                .setPasswordReplaced();
        case CHANGE_PASSWORD_FIELDS_ERROR:
            return state
                .passwordChangesOff()
                .setPasswordChangesFieldsError(action.payload)
        default:
            return state;
    }
}

/**
 * Selectors
 */

/**
 * @param {PasswordChangeStateEntity[]} state
 * @return {boolean}
 */
export const passwordReplaced = (state) => state[moduleName].getPasswordReplaced()

/**
 * @param {PasswordChangeStateEntity[]} state
 * @return {boolean}
 */
export const loading = (state) => state[moduleName].passwordChangesLoading()

/**
 * @param state
 * @return {{}|defaultFields.passwordChangesFieldsError}
 */
export const fieldErrors = (state) => state[moduleName].getPasswordChangesFieldsError();

/**
 * Actions
 */
export const changePasswordStart = () => ({
    type: CHANGE_PASSWORD_START
})

export const changePasswordSuccess = () => ({
    type: CHANGE_PASSWORD_SUCCESS,
})

export const setFieldsError = response => ({
    type: CHANGE_PASSWORD_FIELDS_ERROR,
    payload: {fields: response.result, msg: response.message}
})

export const changePassword = fieldsValues => ({
    type: CHANGE_PASSWORD_REQUEST,
    method: MessageChangePassword.METHOD,
    payload: fieldsValues,
    beforeAC: changePasswordStart,
    successAC: changePasswordSuccess,
    fieldErrorAC: setFieldsError,
    forbiddenErrorAC: logout
})