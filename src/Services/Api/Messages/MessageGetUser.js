import AbstractMessage from './AbstractMessage';

export default class MessageGetUser extends AbstractMessage {

    static METHOD = 'user/get';

    /**
     * @param access_token
     */
    constructor(access_token) {
        super()
        this.args = {access_token}
    }
}