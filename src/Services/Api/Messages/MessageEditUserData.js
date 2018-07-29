import AbstractMessage from "./AbstractMessage"

export default class MessageEditUserData extends AbstractMessage {

    static METHOD = 'invoices/edit-user-data';

    /**
     * @param {string} access_token
     * @param {integer} id
     * @param {string} identifier
     * @param {string} description
     */
    constructor(access_token, id, identifier, description = '') {
        super()
        this.args = {access_token, id, identifier, description}
    }
}