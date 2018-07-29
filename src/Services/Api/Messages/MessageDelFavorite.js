import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageDelFavorite extends AbstractMessage {

    static METHOD = 'payments/del-favorite';

    /**
     * @param {string} access_token
     * @param {integer} id
     */
    constructor(access_token, id) {
        super()

        if (Validator.isNull(id)  || !Validator.isInt(id)) {
            throw new TypeError('id must be integer, don\'t must be null')
        }
        this.args = {access_token, id}
    }
}