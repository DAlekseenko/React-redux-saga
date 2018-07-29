import {Record} from 'immutable'

const defaultFields = {
    id: '',
    name: ''
}

export default class RegionEntity extends Record(defaultFields) {

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
}
