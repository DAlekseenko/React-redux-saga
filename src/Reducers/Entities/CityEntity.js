import {Record} from 'immutable'

const defaultFields = {
    id: '',
    name: '',
    parent_id: ''
}

export default class CityEntity extends Record(defaultFields) {

    /**
     * @return {string}
     */
    getId() {
        return this.id
    }

    /**
     * @return {string}
     */
    getName() {
        return this.name
    }

    /**
     * @return {string}
     */
    getParentId() {
        return this.parent_id
    }
}

