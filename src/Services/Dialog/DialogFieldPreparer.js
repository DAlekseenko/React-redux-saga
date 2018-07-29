import {prepareOriginFieldPhone} from '../../Utils/helper';
import {trim} from '../../Utils/helper';
import is from 'is_js';
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"

export default class DialogFieldPreparer {

    originalFields = {};

    otherFields = {};

    dialogState = {};

    dialogBlocks;

    fieldError;

    constructor(state, dialogBlocks) {
        this.dialogState = state
        this.dialogBlocks = dialogBlocks
        this.prepared()
    }

    setFields(name, {originalField, mask}) {
        const fieldsValue = DialogFieldPreparer.setFieldValue(mask, this.dialogState[name]);
        if (originalField) {
            this.originalFields[name] = fieldsValue;
        } else {
            this.otherFields[name] = fieldsValue;
        }
    }

    prepared() {
        for (let name in this.dialogState) {
            const fieldProps = this.getFieldProps(name)
            if (fieldProps && this.validateLengthString(name, fieldProps)) {
                this.setFields(name, fieldProps)
            }
        }
    }

    getFieldProps(name) {
        return this.dialogBlocks.last().get('fields').get(name);
    }

    validateLengthString(name, {minLength, maxLength, mask}) {
        if (is.string(this.dialogState[name])) {
            let text = '';

            const value = DialogFieldPreparer.setFieldValue(mask, trim(this.dialogState[name]));

            if (minLength && value.length < minLength) {
                text = `Минимально допустимое количество символов: ${minLength}. Длина текста сейчас: ${value.length}`
            }
            if (maxLength && value.length > maxLength) {
                text = `Максимально допустимое количество символов: ${maxLength}. Длина текста сейчас: ${value.length}`
            }
            if (text) {
                this.fieldError = setFieldError(this.dialogState, name, text);
                return false
            }
        }
        return true
    }

    static setFieldValue(mask, fieldValue){
        return mask ? prepareOriginFieldPhone(fieldValue, mask.prefix) : fieldValue
    }
}



