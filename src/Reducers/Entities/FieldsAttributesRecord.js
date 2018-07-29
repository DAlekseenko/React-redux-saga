import {Record} from "immutable"

const defaultFields = {
    name: '',
    type: 'text',
    label: '',
    required: false,
    min: null,
    max: null,
    min_length: null,
    max_length: null,
    step: '0.01'
}

export default class FieldsAttributesRecord extends Record(defaultFields) {

    /**
     * @return {string}
     */
    get Name() {
        return this.name
    }

    /**
     * @return {string}
     */
    get Type() {
        const types = ['text', 'password', 'email', 'submit', 'radio', 'checkbox', 'number'];
        if (types.includes(this.type)) {
            return this.type;
        }
        return defaultFields.type
    }

    /**
     * @return {string}
     */
    get Label() {
        return this.label
    }

    /**
     * @return {bool}
     */
    get Required() {
        return this.required
    }

    /**
     * @return {number|null}
     */
    get Min() {
        return this.min
    }

    /**
     * @return {number|null}
     */
    get Max() {
        return this.max
    }

    get MinLength() {
        return this.min_length
    }

    get MaxLength() {
        return this.max_length
    }

    get Step() {
        return  this.Name === 'sum' ? this.step : null
    }

}