import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageAddFavorite extends AbstractMessage {

    static METHOD = 'payments/add-favorite';

    /**
     * @param {string} access_token
     * @param {string} key
     * @param {string | null} name
     */
    constructor(access_token, key, name = null) {
        super()
        if (!key) {
            throw new Error('key must not be NULL')
        }

        this.args = {access_token, key, name}
    }
}