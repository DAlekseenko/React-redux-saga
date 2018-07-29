import is from 'is_js'

export default class ParamsValidator {
    static isInt(value) {
        return !isNaN(value) && value == parseInt(value);
    }

    static isNull(value) {
        return is['null'](value);
    }

    static isEmpty(value) {
        return is.empty(value)
    }

    static isExist(value) {
        return is.existy(value)
    }
}