import {Record} from 'immutable'
import UserDataServiceEntity from './UserDataServiceEntity'

const defaultFields = {
    id: '',
    name: '',
    key: '',
    placeholder: '',
    img: '',
    services: [],
    is_global: true,
    has_children: false
}

export default class UserDataFolderEntity extends Record(defaultFields) {

    /**
     * @return {string}
     */
    getId() {
        return this.id;
    }

    /**
     * @return {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @return {string}
     */
    getKey() {
        return this.key;
    }

    /**
     * @return {string}
     */
    getPlaceholder() {
        return this.placeholder;
    }

    /**
     * @return {string}
     */
    getImg() {
        return this.img;
    }

    /**
     * @return {Array<UserDataServiceEntity>}
     */
    getUserDataServices() {
        return this.services.map(item => new UserDataServiceEntity(item));
    }

    /**
     * @return {boolean}
     */
    isGlobal() {
        return this.is_global;
    }

    /**
     * @return {boolean}
     */
    hasChildren() {
        return this.has_children;
    }
}