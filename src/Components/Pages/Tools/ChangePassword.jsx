import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import FormGroup from "../Partials/FormGroup";
import {changePassword, loading, passwordReplaced, fieldErrors} from "../../../Reducers/Ducks/tools/passwordChange";

export class ChangePassword extends Component {

    static propTypes = {
        changePassword: PropTypes.func.isRequired,
        blockManagement: PropTypes.func.isRequired,
        block: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
        successMsg: PropTypes.string,
        errors: PropTypes.object
    }

    state = {
        errors: {},
        password: '',
        passwordRepeat: ''
    }

    componentWillReceiveProps(nextProps) {
        const {errors, success} = nextProps
        errors && this.setState({errors})
        if (success) {
            const msg = 'Пароль успешно изменен'
            this.props.blockManagement(this.props.block, msg)
        }
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.props.changePassword(this.state)
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    render = () =>
        <div>
            <form onSubmit={this._onSubmit}>
                <FormGroup label='Новый пароль' type='password' name='password' errors={this.state.errors}
                           value={this.state.password} onChange={this._onChange} disabled={this.props.loading}
                           hint={'Минимальная длина 8 символов. Должен содержать цифры, заглавные и строчные символы'}/>
                <FormGroup label='Подтвердите пароль' type='password' name='passwordRepeat' errors={this.state.errors}
                           value={this.state.passwordRepeat} onChange={this._onChange} disabled={this.props.loading}/>
                <button disabled={this.props.loading}>Сохранить</button>
            </form>
        </div>
}

export default connect(
    state => ({
        loading: loading(state),
        success: passwordReplaced(state),
        errors: fieldErrors(state)
    }),
    {changePassword})
(ChangePassword)