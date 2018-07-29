import axios from 'axios';


export default class BaseApiCaller {

    url = null;
    message = {};
    config = {timeout: 30000, headers: {}};

    createMessage() {}

    createConfig() {}

    call() {
        return axios.post(this.url, this.message, this.config)
    }

    /**
     *
     * @return {Object}
     */
    getMessage() {
        return this.message;
    }
}
