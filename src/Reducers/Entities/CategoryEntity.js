import {Record} from 'immutable'
import ServiceEntity from './ServiceEntity'

const defaultFields = {
    id: '',
    name: '',
    img: '',
    location: '',
    count: null,
    top: [],
    path: '',
    u_key: ''
}

export default class CategoryEntity extends Record(defaultFields) {

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
     *
     * @return {Array<CategoryEntity|ServiceEntity>}
     */
    getTop() {
        return this.top.map(item => (
            item.is_category === true ?
                new CategoryEntity(item) :
                new ServiceEntity(item)
        ))
    }
}