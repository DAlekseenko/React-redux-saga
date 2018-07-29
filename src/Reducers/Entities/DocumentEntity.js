import {Record} from 'immutable'

const defaultFields = {
    title: '',
    text: '',
}

export default class DocumentEntity extends Record(defaultFields) {

    /**
     * @return {string}
     */
    getTitle() {
        return this.title
    }

    /**
     * @return {string}
     */
    getText() {
        return this.text
    }
}

