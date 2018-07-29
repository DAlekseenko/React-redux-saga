import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageEripDialog extends AbstractMessage {

    static METHOD = 'erip-dialog';

    /**
     * @param {string} access_token
     * @param {integer} serviceCode
     * @param {null} fields
     * @param {{}} otherFields
     * @param {null} mts_session
     */
    constructor(access_token, serviceCode, mts_session = null, fields = null, otherFields = {}) {
        super()
        if(!serviceCode){
            throw new TypeError('serviceCode mandatory variable')
        }
        if (!Validator.isInt(serviceCode)) {
            throw new TypeError('serviceCode must be integer')
        }
        this.args = Object.assign({access_token, serviceCode, fields, mts_session}, otherFields)
    }

}