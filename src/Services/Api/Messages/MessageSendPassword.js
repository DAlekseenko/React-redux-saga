import AbstractMessage from "./AbstractMessage"

export default class MessageSendPassword extends AbstractMessage {

    static METHOD = 'user/send-password';

    /**
     * @param {string} access_token
     * @param {string} phone
     */
    constructor(access_token, phone) {
        super()
        this.args = {access_token, phone}
    }
}
