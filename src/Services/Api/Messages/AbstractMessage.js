export default class AbstractMessage {

    static METHOD = null;

    args = {}

    getMethod() {
        return this.constructor.METHOD
    }

    getMessage() {
        return {
            method: this.getMethod(),
            args: this.args
        }
    }
}