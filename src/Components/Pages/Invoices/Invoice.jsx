import React from 'react';
import {CURRENCY} from "../../../CONSTANTS"

/**
 * @property {Array<InvoiceEntity>} invoices
 */

export const Invoice = ({invoice}) =>
    <div className="payment-result">
        <div className="payment-result_item">
            <h5 className="-pb3">Услуга:</h5>
            <h3>{invoice.getName()}</h3>
        </div>
        <div className="payment-result_item">
            <h5 className="-pb3">Город:</h5>
            <h3>{invoice.service.location ? invoice.service.location.name : <i>(Нет)</i>}</h3>
        </div>
        <div className="payment-result_item">
            <h5 className="-pb3">Категория:</h5>
            <h3>{invoice.getCategoryName()}</h3>
        </div>
        <div className="payment-result_item">
            <h5 className="-pb3">Сумма к оплате:</h5>
            <h3>{`${invoice.getSumWithCommission()} ${CURRENCY}`}</h3>
        </div>
        <div className="payment-result_item">
            <h5 className="-pb3">Без учета комиссии:</h5>
            <h3>{`${invoice.getSumWithoutCommission()} ${CURRENCY}`}</h3>
        </div>
        <div className="payment-result_item">
            <h5 className="-pb3">Размер комиссии:</h5>
            <h3>{`${invoice.getCommission()} ${CURRENCY}`}</h3>
        </div>
        <div className="payment-result_item">
            <h5 className="-pb3">{invoice.getIdentifierName()}</h5>
            <h3>{invoice.getIdentifierValue()}</h3>
        </div>
    </div>


