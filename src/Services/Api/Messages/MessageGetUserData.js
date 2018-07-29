import AbstractMessage from './AbstractMessage';
import {TOKEN} from "../../../CONSTANTS"

export default class MessageGetUserData extends AbstractMessage {

    static METHOD = 'invoices/get-user-data';
    /**
     * @param access_token
     */
    constructor(access_token) {
        super()
        this.args = {access_token}
    }
}