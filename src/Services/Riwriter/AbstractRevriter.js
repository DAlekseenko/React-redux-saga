export default class UrlRewriter {

    url;

    regExp;

    found = [];

    constructor(url, pattern) {
        this.url = url;
        this.regExp = new RegExp(pattern);
    }

    find() {
        if (this.regExp.test(this.url)) {
            this.found = this.url.match(this.regExp)
            return true
        }
        return false
    }

    replace(replaceText = '') {
        return this.url.replace(this.regExp, replaceText);
    }

    newString() {
        throw  new Error('should be implemented for a specific case')
    }

}