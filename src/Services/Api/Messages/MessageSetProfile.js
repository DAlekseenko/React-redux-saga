import AbstractMessage from "./AbstractMessage"

export default class MessageSetProfile extends AbstractMessage {

    static METHOD = 'user/set-profile';

    /**
     * @param {string|null} access_token
     * @param {string|null} first_name
     * @param {string|null} last_name
     * @param {string|null} patronymic
     */
    constructor(access_token, first_name, last_name, patronymic) {
        super()
        this.args = {access_token, first_name, last_name, patronymic}
    }
}