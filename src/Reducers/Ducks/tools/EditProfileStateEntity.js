import {Record} from 'immutable'

export const defaultFields = {
    editingProfile: false,
    profileEdited: false,
    editingProfileFieldsError: {},
}

export default class EditProfileStateEntity extends Record(defaultFields) {

    /**
     * @return {Immutable.Map<string, V>}
     */
    editingProfileOn() {
        return this
            .set('editingProfileFieldsError', {})
            .set('profileEdited', false)
            .set('editingProfile' ,true);
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    editingProfileOff(){
        return this.set('editingProfile' ,false);
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    setProfileEdited() {
        return this.set('profileEdited', true);
    }

    /**
     * @param error
     * @return {Immutable.Map<string, V>}
     */
    setEditingProfileFieldsError(error) {
        return this.set('editingProfileFieldsError', error);
    }

    /**
     * @return {{}|editingProfileFieldsError}
     */
    getEditingProfileFieldsError() {
        return this.editingProfileFieldsError;
    }

    /**
     * @return {boolean}
     */
    editingProfileLoading() {
        return this.editingProfile;
    }

    getProfileEdited(){
        return this.profileEdited;
    }

}

