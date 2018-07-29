import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import classNames from 'classnames'
import {getFieldError} from 'pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper'

export default class FormGroup extends Component {

    static propTypes = {
        /** Input */
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        onChange: PropTypes.func,
        inputModifier: PropTypes.string,
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        max: PropTypes.string,
        min: PropTypes.string,
        step: PropTypes.string,
        /** Mask*/
        mask: PropTypes.string,
        maskChar: PropTypes.string,
        alwaysShowMask: PropTypes.bool,
        /** Label */
        label: PropTypes.string,
        labelModifier: PropTypes.string,
        /** Hint*/
        hint: PropTypes.string,
        hintModifier: PropTypes.string,
        /** Wrapper */
        wrapperModifier: PropTypes.string,
        /** General */
        errors: PropTypes.object,
        isNotForm: PropTypes.bool,
    };

    getInput() {
        const {
            mask, name, value, onChange, placeholder, type = 'text', checked, disabled, required,
            isNotForm, inputModifier, maskChar, alwaysShowMask, maxLength, minLength, max, min, step
        } = this.props;
        const inputClass = {
            'form-group_control': !isNotForm,
            'danger': getFieldError(name, this.props)
        }

        inputClass[inputModifier] = !!inputModifier;

        const inputAttr = {
            id: name, className: classNames(inputClass), name, type, placeholder, step,
            value, onChange, disabled, maxLength, minLength, checked, required, max, min
        }

        const maskAttr = {
            id: name, className: classNames(inputClass), name, value, onChange, disabled,
            mask, maskChar, alwaysShowMask
        }

        if (mask) {
            return <InputMask {...maskAttr}/>
        }
        return <input {...inputAttr}/>
    }

    render() {
        const {name, label, wrapperModifier, labelModifier, isNotForm, hint} = this.props;

        const errorText = getFieldError(name, this.props);

        const wrapperClass = {
            'form-group -form-simple': !isNotForm,
            '-has-error': !!errorText,
        };
        wrapperClass[wrapperModifier] = !!wrapperModifier;

        const labelClass = {
            'form-group_label': !isNotForm
        };
        labelClass[labelModifier] = !!labelModifier;

        return (
            <section className={classNames(wrapperClass)}>
                {label && <label htmlFor={name} className={classNames(labelClass)}>{label}</label>}
                <div>
                    {this.getInput()}
                    {errorText && <div className="form-group_help">{errorText}</div>}
                </div>
                {hint && <div className="form-group_hint">{hint}</div>}
            </section>
        )
    }
}
