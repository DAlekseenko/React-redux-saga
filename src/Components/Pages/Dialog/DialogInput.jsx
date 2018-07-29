import React, {Component} from 'react';
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import {SimpleDatePicker, Input, Checkbox} from "../Partials/index"
import classNames from "classnames"
import {getFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import moment from "moment"


export default class DialogInput extends Component {

    static propTypes = {
        mask: PropTypes.object,
        hint: PropTypes.string,
        editable: PropTypes.bool
    };

    _getInputClasses() {
        const {inputModifier, name} = this.props;
        const inputClass = {
            'form-group_control': true,
            'danger': getFieldError(name, this.props)
        }
        inputClass[inputModifier] = !!inputModifier;
        return classNames(inputClass);
    }

    _getInput() {

        const {
            name, type, min, max, required, disabled, nominal, payState, placeholder, mask, isSum,
            maxLength,minLength,
            value, hint, editable, format, onCheck, onChange
        } = this.props;

        if (!editable) {
            return <h3>{value}</h3>
        }

        let component

        const attributes = {
            name,
            required,
            disabled,
            className: this._getInputClasses()
        }

        switch (type) {
            case 'R':

                component = <Input type={'number'} min={min} max={max}
                                   step={nominal || (isSum && '0.01') || 'any'} {...attributes}
                                   value={payState[name]} placeholder={placeholder} onChange={onChange}/>
                break
            case 'I':
                if (mask) {
                    component = <InputMask mask={mask.prefix + ' ' + mask.mask + ' ' + mask.postfix}
                                           value={payState[name]} maskChar={'*'} alwaysShowMask={true}
                                           onChange={onChange} {...attributes}/>
                    break
                }
                component = <Input type={'number'} min={min} max={max} step="1" {...attributes}
                                   value={payState[name]} placeholder={placeholder} onChange={onChange}/>
                break
            case 'S':
                component = <Input type={'text'} value={payState[name]} placeholder={placeholder}
                                   maxLength={maxLength} minLength={minLength}
                                   disabled={disabled} onChange={onChange} {...attributes}/>
                break
            case 'N':
                component = <InputMask mask={placeholder} value={payState[name]} maskChar={'*'}
                                       alwaysShowMask={true} onChange={onChange} {...attributes}/>
                break
            case 'D':
                component = <SimpleDatePicker format={format} onChange={onChange} {...attributes}
                                              value={moment(payState[name], format)}/>
                break
            case 'L':
                component = <Checkbox onChange={onCheck} checked={payState[name]} {...attributes}/>
                break
        }

        return <div>{component} {hint && hint}</div>
    }


    render = () => this._getInput()

}

