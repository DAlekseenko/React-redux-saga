import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetHistoryItems extends AbstractMessage {

    static METHOD = 'payments/history-item';

    /**
     * @param {string} transaction_uuids
     * @param {int} advanced
     */
    constructor(transaction_uuids, advanced = 0) {
        super()
        if (Validator.isNull(transaction_uuids)) {
            throw new TypeError('transaction_uuids must not be NULL')
        }
        transaction_uuids = transaction_uuids.split(',')

        this.args = {transaction_uuids, advanced}
    }
}