import {Record} from 'immutable'
import ServiceEntity from './ServiceEntity'

const defaultFields = {
    id: '',
    name: '',
    identifier: '',
    description: '',
    service: null
}

export default class UserDataServiceEntity extends Record(defaultFields) {

    /**
     * @return {integer}
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
    getIdentifier() {
        return this.identifier
    }

    /**
     * @return {string}
     */
    getDescription() {
        return this.description
    }

    /**
     * @return {ServiceEntity}
     */
    getService() {
        return new ServiceEntity(this.service)
    }
}