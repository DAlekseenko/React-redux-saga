import {Record} from 'immutable'
import CategoryEntity from './CategoryEntity'

const defaultFields = {
    id: '',
    name: '',
    identifier_name: '',
    mask: null, /** @todo реализовать */
    img: '',
    location: '',
    path: '',
    parents: [],
    u_key: ''
}

export default class ServiceEntity extends Record(defaultFields) {

    /**
     * @return {string}
     */
    getId() {
        return this.id
    }

    /**
     * @return {string}
     */
    getImg() {
        return this.img
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
    getIdentifierName() {
        return this.identifier_name
    }

    /**
     * @return {string}
     */
    getLocation() {
        return this.location
    }

    /**
     * @return {string}
     */
    getPath() {
        return this.path
    }

    /**
     * @return {string}
     */
    getKey() {
        return this.u_key
    }

    /**
     * @return {Array<CategoryEntity>}
     */
    getParents() {
        return this.parents.map(item => new CategoryEntity(item))
    }
}
