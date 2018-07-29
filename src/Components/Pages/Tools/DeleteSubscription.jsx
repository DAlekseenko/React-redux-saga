import React, {Component} from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {subsCanceled, loading, fail, cancelSubscriptionRequest} from "../../../Reducers/Ducks/tools/cancelSubs"

export class DeleteSubscription extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        fail: PropTypes.bool.isRequired,
        success: PropTypes.bool.isRequired,
        cancelSubscriptionRequest: PropTypes.func.isRequired,
    }

    _onClick = () => {
        this.props.cancelSubscriptionRequest()
    }

    render = () =>
        <div>
            {this.props.success &&
            <h3 className="stop-subscription_result">
                <strong style={{color: 'green'}}>
                    Ваш запрос на удаление услуги «МТС Деньги» принят, ожидайте подтверждение по SMS
                </strong>
            </h3>}
            <h3>
                <strong>Внимание!</strong>
            </h3>
            <p>Вы действительно хотите удалить услугу «МТС&nbsp;Деньги»?</p>
            <div>
                <button className="stop-subscription_button mts-button"
                        onClick={this._onClick} disabled={this.props.success}>
                    <span>Удалить услугу</span>
                </button>
                {this.props.fail &&
                <div className="setting-error --stop--error" style={{color: 'red'}}>
                    Произошла ошибка. Повторите попытку позже.
                </div>}
            </div>
        </div>
}

export default connect(
    state => ({
        loading: loading(state),
        fail: fail(state),
        success: subsCanceled(state),
    }), {cancelSubscriptionRequest})
(DeleteSubscription)