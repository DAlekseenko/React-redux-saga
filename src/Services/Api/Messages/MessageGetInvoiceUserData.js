import Validator from "../ParamsValidator"
import AbstractMessage from "./AbstractMessage"

export default class MessageGetFavoriteItem extends AbstractMessage {

    static METHOD = 'invoices/get-user-data-item';

    /**
     * @param {string} access_token
     * @param {integer} id
     */
    constructor(access_token, id) {
        super()
        if (!id || !Validator.isInt(id)) {
            throw new TypeError('id must be integer')
        }
        this.args = {access_token, id}
    }

}