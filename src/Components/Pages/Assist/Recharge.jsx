import React from 'react';
import {updateStateFromAssoc} from "pbr-lib-front-utils/dist/reactStateHelper"
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import PageComponent from "../../App/PageComponent"

export default class Recharge extends PageComponent {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        sum: '',
        uuids: '',
        errors: {}
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    _onSubmit = (e) => {
        e.preventDefault()

        this.props.recharge(this.state)
    }

    _onInValid = (e) => {
        e.preventDefault()

        for (let {validationMessage, name} of e.target.form.elements) {
            validationMessage && this.setState(setFieldError(this.state, name, validationMessage))
        }
    }

    componentWillMount() {
        super.componentWillMount()
        this.setState(updateStateFromAssoc(this.state, this.props.user))
    }

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.setState({errors: nextProps.errors})
    }
}


