import AbstractMessage from "./AbstractMessage"

export default class MessageDeleteUserData extends AbstractMessage {

    static METHOD = 'invoices/delete-user-data';

    /**
     * @param {string} access_token
     * @param {string} id
     */
    constructor(access_token, id) {
        super()
        this.args = {access_token, id}
    }
}
