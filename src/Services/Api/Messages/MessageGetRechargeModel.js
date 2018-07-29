import AbstractMessage from "./AbstractMessage"

export default class MessageGetRechargeModel extends AbstractMessage {

    static METHOD = 'user/get-recharge-model';

    /**
     * @param {string} access_token
     */
    constructor(access_token) {
        super()
        this.args = {access_token}
    }
}