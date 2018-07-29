import AbstractMessage from "./AbstractMessage"

export default class MessageGetService extends AbstractMessage {

    static METHOD = 'categories/get-service';

    /**
     * @param {string} service_id
     */
    constructor(service_id = null) {
        super()
        this.args = {service_id}
    }
}
