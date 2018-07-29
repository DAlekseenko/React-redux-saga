import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetFavorites extends AbstractMessage {

    static METHOD = 'payments/favorites';

    /**
     * @param {string} access_token
     * @param {int} advanced
     */
    constructor(access_token, advanced = 1) {
        super()

        if (!Validator.isInt(advanced)) {
            throw new Error('advanced must be integer')
        }

        this.args = {access_token, advanced}
    }
}