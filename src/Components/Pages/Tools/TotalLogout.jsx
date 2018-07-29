import React, {Component} from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {totalLogout, loading, fail} from "../../../Reducers/Ducks/tools/totalLogout"

export class TotalLogout extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        totalLogout: PropTypes.func.isRequired
    }

    _onClick = () => {
        this.props.totalLogout()
    }

    render = () =>
        <div>
            <h3>
                <strong>Внимание!</strong>
            </h3>
            <p>Нажимая "Выйти на всех устройствах", Вы сбрасываете пароль для доступа к сервису МТС Деньги на всех
                устройствах
                (компьютеры, телефоны).</p>
            <p>Для дальнейшего пользования сервисом МТС Деньги Вам потребуется пройти процедуру регистрации на каждом
                устройстве
                заново.</p>
            <p>Используйте эту возможность только при крайней необходимости.</p>
            <div className="logout-anywhere">
                <button className="logout-anywhere_button mts-button" onClick={this._onClick}
                        disabled={this.props.loading}>
                    <span>Выйти на всех устройствах</span></button>
                <div className="setting-error --logout-anywhere-error"
                     style={{display: this.props.fail ? 'block' : 'none', color: 'red'}}>
                    Произошла ошибка. Повторите попытку позже.
                </div>
            </div>
        </div>
}

export default connect(
    state => ({
        loading: loading(state),
        fail: fail(state)
    }),
    {totalLogout})
(TotalLogout)