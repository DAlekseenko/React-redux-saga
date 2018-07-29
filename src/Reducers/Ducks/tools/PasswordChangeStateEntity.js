import {Record} from 'immutable'

export const defaultFields = {
    passwordChanges: false,
    passwordReplaced: false,
    passwordChangesFieldsError: {}
}

export default class PasswordChangeStateEntity extends Record(defaultFields) {

    /**
     * @return {Immutable.Map<string, V>}
     */
    passwordChangesOn() {
        return this
            .set('toolsErrors', {})
            .set('passwordChanges', true)
            .set('passwordReplaced', false)
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    passwordChangesOff() {
        return this.set('passwordChanges', false);
    }

    /**
     * @return {boolean}
     */
    passwordChangesLoading() {
        return this.passwordChanges;
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    setPasswordReplaced() {
        return this.set('passwordReplaced', true);
    }

    /**
     * @return {passwordReplaced|boolean}
     */
    getPasswordReplaced(){
         return this.passwordReplaced
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    editingProfileOff() {
        return this.set('editingProfile', false);
    }

    /**
     * @param error
     * @return {Immutable.Map<string, V>}
     */
    setPasswordChangesFieldsError(error) {
        return this.set('passwordChangesFieldsError', error);
    }

    /**
     * @return {{}|defaultFields.passwordChangesFieldsError}
     */
    getPasswordChangesFieldsError() {
        return this.passwordChangesFieldsError;
    }
}