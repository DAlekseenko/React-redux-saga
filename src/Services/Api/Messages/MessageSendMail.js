import AbstractMessage from "./AbstractMessage"

export default class MessageSendMail extends AbstractMessage {

    static METHOD = 'payments/send-invoice';

    /**
     * @param {string} recipient
     * @param {string} key
     */
    constructor(recipient, key) {
        super()
        this.args = {recipient, key}
    }
}
