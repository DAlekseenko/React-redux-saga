import AbstractMessage from "./AbstractMessage"

export default class MessageLoginUser extends AbstractMessage {

    static METHOD = 'user/login';

    /**
     * @param {string} phone
     * @param {string} password
     * @param {integer} location_id
     */
    constructor(phone, password, location_id) {
        super()
        this.args = {phone, password, location_id}
    }

}