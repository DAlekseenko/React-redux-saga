import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from "../../../Reducers/Ducks/auth/auth"

export class NavMenu extends Component {


    logout = e => {
        e.preventDefault()
        this.props.logout()
    }


    render = () =>
        <nav className="navMenu">
            <NavLink exact to='/'>Главная</NavLink>
            <NavLink to='/settings'>Настройки</NavLink>
            <NavLink to='/accounts'>Мои счета</NavLink>
            <NavLink to='/payments-history'>История платежей</NavLink>
            <NavLink to='/favorites'>Избранные платежи</NavLink>
            <NavLink to='/exit' onClick={this.logout}>Выход</NavLink>
        </nav>
}

export default connect(null, {logout})(NavMenu)