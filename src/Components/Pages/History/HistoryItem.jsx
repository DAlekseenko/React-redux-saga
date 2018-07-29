import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PrintComponent from "../../Decorators/PrintComponent"
import {SendHistoryItemToMail, PrintHistoryItem} from "./index"
import Popover from "../Partials/Popover"
import {AddFavorite} from "../Favorites"

export default class HistoryItems extends Component {

    static propTypes = {
        historyItem: PropTypes.object.isRequired,
        sending: PropTypes.bool.isRequired,
        mailSection: PropTypes.object.isRequired,
        mailSender: PropTypes.func.isRequired,
        user: PropTypes.object,
        popoverOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onOpen: PropTypes.func.isRequired
    }

    getFields = fields => fields.map(({name, value}, key) => {
        if (name && value) {
            return <div key={key} className="payment-result_item">
                <h5>{name}:</h5>
                <h3>{value}</h3>
            </div>
        }
    })

    render() {
        const {historyItem, mailSender, mailSection, sending, user} = this.props;
        return <div>
            {user &&
            <Popover open={this.props.popoverOpen} onClose={this.props.onClose}>
                <button className="button" onClick={this.props.onOpen}>Добавить в Изб</button>
                <AddFavorite payment_key={historyItem.key} onClose={this.props.onClose}/>
            </Popover>}
            <div className="payment-result_item">
                <h5 className="-pb3">Услуга:</h5>
                <h3>{historyItem.service.name}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Город:</h5>
                <h3>{historyItem.service.location ? historyItem.service.location.name : <i>'(Нет)'</i>}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Статус:</h5>
                <h3>{historyItem.status}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Категория:</h5>
                <h3>{historyItem.category_name}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Дата проведения:</h5>
                <h3>{historyItem.date_pay}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Код транзакции:</h5>
                <h3>{historyItem.transaction_uuid}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Сумма к оплате:</h5>
                <h3>{historyItem.sum + ' ' + historyItem.currency}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Без учета комиссии:</h5>
                <h3>{historyItem.total_sum + ' ' + historyItem.currency}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Размер комиссии:</h5>
                <h3>{historyItem.commission + ' ' + historyItem.currency}</h3>
            </div>
            {this.getFields(historyItem.fields)}
            {historyItem.status === "SUCCESS" &&
            <SendHistoryItemToMail sender={mailSender} receiptKey={historyItem.key} sectionID={historyItem.id}
                                   mailSection={mailSection.get(historyItem.id)} sending={sending}/>}
            {historyItem.status === "SUCCESS" &&
            <PrintComponent buttonText='Распечатать квитанцию' buttonClass='search-form_button-wrap_button'>
                <PrintHistoryItem historyItem={historyItem}/>
            </PrintComponent>
            }
            <hr/>
        </div>
    }
}