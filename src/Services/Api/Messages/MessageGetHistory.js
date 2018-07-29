import AbstractMessage from "./AbstractMessage"
import {TOKEN} from "../../../CONSTANTS"
import Validator from "../ParamsValidator"

export default class MessageGetHistory extends AbstractMessage {

    static METHOD = 'payments/history';

    /**
     * @param {string} access_token
     * @param {null} date_from
     * @param {null} date_to
     * @param {int} page
     * @param {int} per_page
     */
    constructor(access_token, date_from = null, date_to = null, page = 1, per_page = 10) {
        super()
        this.args = {access_token, per_page, page, date_from, date_to}
    }
}