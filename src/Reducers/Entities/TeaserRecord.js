import {Record, List, OrderedMap} from "immutable"
import {AssistTextPayParams} from "../entities"

const defaultFields = {
    text: [],
    suggested_sum: [],
    params: {}
}

export default class TeaserRecord extends Record(defaultFields) {

    /**
     * @return {string}
     */
    get Text() {
        return this.text.map(record => {
            this.Params.forEach((value, key) => {
                record = record.replace(new RegExp(`{{${key}}}`, 'g'), value)
            })
            return record
        }).join(' ')
    }

    /**
     * @return {Map}
     */
    get Params() {
        return new OrderedMap(this.params);
    }

    /**
     * @return {{}}
     */
    get SuggestedSum() {
        return new List(this.suggested_sum);
    }

    get ValidSum(){
        return this.Params.get('balance') > this.Params.get('res')
    }


}