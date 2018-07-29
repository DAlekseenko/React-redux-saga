import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup} from '../Partials'
import {Roller} from '../../Loading'
import {setFieldError} from 'pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper'
import {sendCode, userLogin} from "../../../Reducers/Ducks/auth/auth"
import {getFavicon as favicon} from '../../../resourcePaths';

class Login extends Component {

    state = {
        phone: '',
        password: '',
        phoneForCode: '',
        errors: {},
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.errors);
        nextProps.errors && this.setState({errors: nextProps.errors});
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        delete this.state.errors;
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.isValid(this.state.phone, 'phone') && this.props.userLogin(this.state);
    }

    onCodeSend = (e) => {
        e.preventDefault();
        this.isValid(this.state.phoneForCode,'phoneForCode') && this.props.sendCode(this.state.phoneForCode);
    }

    isValid(phone, fieldName) {
        if (phone.replace(/\D/g, '').length < 12) {
            this.setState(setFieldError(this.state, fieldName, 'Ошибка ввода номера'));
            return false
        }
        return true
    }

    render() {
        const {props: {loading}, state: {errors}} = this;
        return (
            <div className="admin-login">
                <header className="admin-login_header">Авт{<img src={favicon()} alt="МТС"/>}ризуйся же!</header>
                <form className="form-group -form-simple -login-form" method="POST" onSubmit={this.onSubmit}>
                    <fieldset disabled={loading} style={{width: '85%'}}>
                        <FormGroup name="phone" label="Номер телефона" value={this.state.phone}
                                   wrapperModifier="-login-wrapper"
                                   maskChar='*' labelModifier='-login-label'
                                   alwaysShowMask={true} mask="+375\ (99) 999 - 9999"
                                   onChange={this.onChange} errors={errors}/>
                        <FormGroup name="password" type="password" label="Пароль"
                                   wrapperModifier="-login-wrapper"
                                   value={this.state.password} labelModifier='-login-label'
                                   onChange={this.onChange} errors={errors}/>
                        <div className="admin-login-buttons">
                            <div className="admin-login-buttons-left">
                                <a href="/">На главную</a>
                            </div>
                            <div className="admin-login-buttons-right">
                                {loading && <Roller width="38px" parentClass={'login-loading'}/>}
                                <button className="danger">Войти</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <form className="form-group -form-simple -login-form" method="POST" onSubmit={this.onCodeSend}>
                    <fieldset disabled={loading} style={{width: '85%'}}>
                        <FormGroup name="phoneForCode" label="Номер телефона" value={this.state.phoneForCode}
                                   wrapperModifier="-login-wrapper"
                                   maskChar='*' labelModifier='-login-label'
                                   alwaysShowMask={true} mask="+375\ (99) 999 - 9999"
                                   onChange={this.onChange} errors={errors}/>
                        <div className="admin-login-buttons">
                            <div className="admin-login-buttons-right">
                                {loading && <Roller width="38px" parentClass={'login-loading'}/>}
                                <button className="danger">Выслать код для входа</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default connect(
    (({auth}) => ({
        loading: auth.get('loading'),
        errors: auth.get('errors'),
    })),
    {userLogin, sendCode}
)(Login);

