import React, {Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'

import {DialogInput} from './index'
import {getFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"

export default class DialogFormGroup extends Component {

    static propTypes = {
        description: PropTypes.string,
        name: PropTypes.string.isRequired,
        wrapperModifier: PropTypes.string,
        labelModifier: PropTypes.string
    }

    render() {
        const {name, description, wrapperModifier, labelModifier} = this.props
        const errorText = getFieldError(name, this.props.payState)

        const wrapperClass = {
            'form-group': true,
            '-has-error': !!errorText,
        }
        wrapperClass[wrapperModifier] = !!wrapperModifier

        const labelClass = {
            'form-group_label': true
        }
        labelClass[labelModifier] = !!labelModifier

        const label = description || name
        
        return (
            <section className={classNames(wrapperClass)}>
                {label && <label htmlFor={name} className={classNames(labelClass)}>{label}</label>}
                <DialogInput {...this.props}/>
                {errorText && <div className="form-group_help">{errorText}</div>}
            </section>
        )
    }
}




























