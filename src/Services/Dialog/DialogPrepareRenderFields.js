import {Map} from 'immutable'

export default class DialogPrepareRenderFields {

    entities;

    fieldsState = {};

    valueContainer;

    constructor(entities, valueContainer = null) {
        if (!!entities.size) {
            this.entities = entities.last()
            this.valueContainer = valueContainer;
            this.prepare()
        }
    }

    prepare() {
        if (Map.isMap(this.entities)) {
            this.setStateOfPropsForDialog(this.entities.get('fields').toObject())
        }
    }

    setStateOfPropsForDialog(record) {
        for (let name in record) {
            if (record[name].editable) {
                this.fieldsState[name] = this.getDefaultValue(record[name].value);
            }
        }
    }

    getDefaultValue(value) {
        if (value !== null) {
            return value;
        }
        if (this.valueContainer) {
            return this.valueContainer.getValue() || ''
        }
        return '';
    }

}