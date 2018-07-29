import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageChangePassword extends AbstractMessage {

    static METHOD = 'user/change-password';

    /**
     * @param {string} access_token
     * @param {null} password
     * @param {null} passwordRepeat
     */
    constructor(access_token, password = null, passwordRepeat = null) {
        super()
        if (Validator.isNull(access_token)) {
            throw new Error('access_token, do not must be NULL')
        }

        this.args = {access_token, password, passwordRepeat}
    }
}