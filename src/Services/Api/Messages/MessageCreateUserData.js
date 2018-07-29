import AbstractMessage from "./AbstractMessage"

export default class MessageCreateUserData extends AbstractMessage {

    static METHOD = 'invoices/create-user-data';

    /**
     *
     * @param {string} access_token
     * @param {string} service_id
     * @param {string} identifier
     * @param {string} description
     */
    constructor(access_token, service_id, identifier, description = '') {
        super()
        this.args = {access_token, service_id, identifier, description}
    }
}
