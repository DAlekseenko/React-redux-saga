import Validator from "../ParamsValidator"
import AbstractMessage from "./AbstractMessage"

export default class MessageGetCategories extends AbstractMessage {

    static METHOD = 'categories/get';

    /**
     * @param {integer|null} parent_id
     * @param {integer|null} location_id
     */
    constructor(parent_id = null, location_id = null) {
        super()
        if (!Validator.isNull(location_id) && !Validator.isInt(location_id)) {
            throw new TypeError('location_id must be integer or NULL')
        }
        if (!Validator.isNull(parent_id) && !Validator.isInt(parent_id)) {
            throw new TypeError('Parent_id must be integer or NULL')
        }
        this.args = {parent_id, location_id}
    }

}