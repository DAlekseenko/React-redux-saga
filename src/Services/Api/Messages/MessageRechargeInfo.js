import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageRechargeInfo extends AbstractMessage {

    static METHOD = 'user/get-recharge-info';

    /**
     * @param {string} access_token
     * @param {string} order_number
     */
    constructor(access_token, order_number) {
        super()
        if (!Validator.isExist(access_token)) {
            throw new TypeError('access_token don\'t must be NULL or undefined')
        }
        this.args = {access_token, order_number}
    }
}