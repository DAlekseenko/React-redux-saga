import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageUpdateFavorite extends AbstractMessage {

    static METHOD = 'payments/update-favorite';

    /**
     * @param {string} access_token
     * @param {string} id
     * @param {null} name
     */
    constructor(access_token, id, name = null) {
        super()
        if ( Validator.isNull(id) && !Validator.isInt(id)) {
            throw new TypeError('id must be integer, don\'t must be null')
        }
        this.args = {access_token, id, name}
    }
}