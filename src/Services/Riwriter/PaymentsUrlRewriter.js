import AbstractRevriter from './AbstractRevriter';


export default class PaymentsUrlRewriter extends AbstractRevriter {

    newString() {
        if (this.found.length) {
            return `/payments/${this.found[1]}?${this.found[2]}`
        }
        return this.url;
    }


}