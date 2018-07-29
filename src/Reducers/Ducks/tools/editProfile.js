import {appName} from '../../../config';

import {put, takeEvery} from "redux-saga/effects"
import EditProfileStateEntity from "./EditProfileStateEntity"
import {MessageSetProfile} from "../../../Services/Api/Messages"
import {getUserByToken, logout} from "../auth/auth"

/**
 * Constants
 */
export const moduleName = 'tools/setProfile';
const prefix = `${appName}/${moduleName}`;

export const EDIT_PROFILE_REQUEST = `${prefix}/EDIT_PROFILE_REQUEST`;
export const EDIT_PROFILE_START = `${prefix}/EDIT_PROFILE_START`;
export const EDIT_PROFILE_SUCCESS = `${prefix}/EDIT_PROFILE_SUCCESS`;
export const EDIT_PROFILE_FIELDS_ERROR = `${prefix}/EDIT_PROFILE_FIELDS_ERROR`;

/**
 * Reducer
 * @param state
 * @param action
 * @return {*}
 */
export default (state = new EditProfileStateEntity(), action = {}) => {
    switch (action.type) {
        case EDIT_PROFILE_START:
            return state
                .editingProfileOn()
        case EDIT_PROFILE_SUCCESS:
            return state
                .editingProfileOff()
                .setProfileEdited()
        case EDIT_PROFILE_FIELDS_ERROR:
            return state
                .setEditingProfileFieldsError(action.payload)
                .editingProfileOff()
        default:
            return state;
    }
}

/**
 * Selectors
 */

/**
 * @param {EditProfileStateEntity[]} state
 * @return {boolean}
 */
export const profileEdited = (state) => state[moduleName].getProfileEdited()

/**
 * @param {EditProfileStateEntity[]} state
 * @return {boolean}
 */
export const loading = (state) => state[moduleName].editingProfileLoading()

/**
 * @param state
 * @return {{}|editingProfileFieldsError}
 */
export const fieldErrors = (state) => state[moduleName].getEditingProfileFieldsError();

/**
 * Actions
 */

export const editProfileStart = () => ({
    type: EDIT_PROFILE_START
})

export const editProfileSuccess = () => ({
    type: EDIT_PROFILE_SUCCESS
})

export const editFieldsError = response => ({
    type: EDIT_PROFILE_FIELDS_ERROR,
    payload: {fields: response.result, msg: response.message}
})

export const editProfileRequest = fieldsValue => ({
    type: EDIT_PROFILE_REQUEST,
    method: MessageSetProfile.METHOD,
    payload: fieldsValue,
    beforeAC: editProfileStart,
    successAC: editProfileSuccess,
    fieldErrorAC: editFieldsError,
    forbiddenErrorAC: logout
})

/**
 * Sagas
 */
export function* sagas() {
    yield takeEvery(EDIT_PROFILE_SUCCESS, updateUserInfoSaga)
}

export function* updateUserInfoSaga() {
    yield put(getUserByToken())
}