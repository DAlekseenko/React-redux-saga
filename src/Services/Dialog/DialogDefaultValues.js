import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import qs from "qs"

export default class DialogDefaultValues {

    queryString = {}

    defaultValues = []

    constructor(searchString) {
        this.queryString = queryStringToState(searchString);
        this.setDefault()
    }

    setDefault() {
        if (this.queryString.default) {
            this.defaultValues = this.queryString.default;
        }
        return this;
    }

    getValue() {
        return this.defaultValues.shift()
    }

    /**
     * Создать строку с масивом default[]
     * @param string начальная строка
     * @param fields поля с дефолтными значениями
     * @return {*}
     */
    static setDefaultParamsToString(string, fields) {
        if (string && fields && !!fields.length) {
            return string + qs.stringify({default: fields.map(item => item.value)}, {
                arrayFormat: 'brackets',
                encode: false,
                addQueryPrefix: true
            })
        }
        return '';
    }


}