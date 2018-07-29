import {Record} from 'immutable'
import ServiceEntity from './ServiceEntity'

const defaultFields = {
    transaction_uuid: '',
    item_name: '',
    category_name: '',
    service: null,
    total_sum: 0,
    sum: 0,
    commission: 0,
    user_data: {
        name: '',
        value: ''
    }
}

export default class InvoiceEntity extends Record(defaultFields) {

    /**
     * @return {string}
     */
    getTransactionUuid() {
        return this.transaction_uuid
    }

    /**
     * @return {string}
     */
    getName() {
        return this.item_name
    }

    /**
     * @return {string}
     */
    getCategoryName() {
        return this.category_name
    }

    /**
     * @return {int}
     */
    getSumWithoutCommission() {
        return parseFloat(this.sum)
    }

    /**
     * @return {int}
     */
    getSumWithCommission() {
        return parseFloat(this.total_sum)
    }

    /**
     * @return {int}
     */
    getCommission() {
        return parseFloat(this.commission)
    }

    /**
     * @return {string}
     */
    getIdentifierName() {
        return this.user_data.name
    }

    /**
     * @return {string}
     */
    getIdentifierValue() {
        return this.user_data.value
    }

    /**
     * @return {ServiceEntity}
     */
    getService() {
        return new ServiceEntity(this.service)
    }
}
