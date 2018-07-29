import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {formatPhone} from "pbr-lib-front-utils/dist/phoneHelper"
import {getBalance} from "../../../Reducers/AC/authAC"
import {CURRENCY} from "../../../CONSTANTS"
import {Link} from "react-router-dom"
import PageComponent from "../../App/PageComponent"


export class UserInfo extends PageComponent {

    static propTypes = {
        user: propTypes.object.isRequired
    }

    componentWillMount() {
        const {balance, getBalance} = this.props
        !balance && getBalance()
    }

    render = () =>
        <section className="user-section">
            <span className="user-section_header">Здравствуйте!</span>
            <h4 className="user-section_info">{`${this.props.user.first_name} ${this.props.user.patronymic} ${this.props.user.last_name}`}</h4>
            <span className="user-section_header">Номер телефона:</span>
            <h4 className="user-section_info">{formatPhone(this.props.user.phone)}</h4>
            <span className="user-section_header">Баланс:</span>
            <h4 className="user-section_info">
                {this.props.balance ? `${this.props.balance} ${CURRENCY}`
                    : <span className="-error">{this.props.errors}</span>
                }
                <span
                    className={classNames({'roller -balance-refresh': true, '-rotate': this.props.loading})}
                    onClick={() => !this.props.loading && this.props.getBalance()}
                />
            </h4>
            <Link to='/recharge-phone'>
                <button className="recharge_button">Пополнить с карты</button>
            </Link>
        </section>

}

export default connect(
    ({auth}) => ({
        loading: auth.get('loading'),
        balance: auth.get('balance'),
        errors: auth.get('errors')
    }), {getBalance}
)(UserInfo)
