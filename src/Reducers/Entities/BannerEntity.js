import {Record} from 'immutable'

const defaultFields = {
    text: '',
    description: '',
    banner_img: '',
    placeholder: '',
    offset_x: 0,
    offset_y: 0,
    service_id: null,
}

export default class BannerEntity extends Record(defaultFields) {

    /**
     * @return {string}
     */
    getBannerImg() {
        return this.banner_img
    }

    /**
     * @return {string}
     */
    getServiceId() {
        return this.service_id
    }

    /**
     * @return {string}
     */
    getTextTitle() {
        return this.text
    }

    /**
     * @return {string}
     */
    getDescription() {
        return this.description
    }

    /**
     * @return {string}
     */
    getPlaceholder() {
        return this.placeholder
    }

    /**
     * @return {number}
     */
    getOffsetX() {
        return this.offset_x
    }

    /**
     * @return {number}
     */
    getOffsetY() {
        return this.offset_y
    }
}
