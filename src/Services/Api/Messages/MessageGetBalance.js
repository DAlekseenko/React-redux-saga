import AbstractMessage from "./AbstractMessage"

export default class MessageGetBalance extends AbstractMessage {

    static METHOD = 'user/get-balance';

    /**
     * @param {string} access_token
     */
    constructor(access_token) {
        super()
        this.args = {access_token}
    }
}