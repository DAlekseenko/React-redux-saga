import React from 'react';
import PropTypes from 'prop-types';
import {CURRENCY} from "../../../CONSTANTS"
import {connect} from "react-redux"
import {payInvoice} from "../../../Reducers/AC/payIvoicesAC"
import PageComponent from "../../App/PageComponent"

export class Pay extends PageComponent {

    static propTypes = {
        invoices: PropTypes.array.isRequired
    }

    state = {
        sum: 0,
        sumWithOutCommission: 0,
        commission: 0,
        transaction_uuids: []
    }

    componentWillMount() {
        let sum = 0;
        let sumWithOutCommission = 0;
        let commission = 0;
        let transaction_uuids = [];
        this.props.invoices.map(invoice => {
            sum += invoice.getSumWithCommission()
            sumWithOutCommission += invoice.getSumWithoutCommission()
            commission += invoice.getCommission()
            transaction_uuids.push(invoice.getTransactionUuid())
        })
        this.setState({
            sum: sum.toFixed(2),
            sumWithOutCommission: sumWithOutCommission.toFixed(2),
            commission: commission.toFixed(2),
            transaction_uuids
        })
    }

    componentWillReceiveProps(nextProps) {
        const {transactionsResult} = nextProps;

        if (transactionsResult) {
            const uuids = [];
            for (let transaction in transactionsResult) {
                if (transactionsResult[transaction]) {
                    uuids.push(transaction)
                }
            }
            uuids.length && this.history.push(`/history-items/${uuids.join(',')}`)
        }
    }

    _pay = () => {
        const {transaction_uuids} = this.state
        this.props.payInvoice({transaction_uuids})
    }

    render = () =>
        <div>
            {this.props.error &&
            <div style={{color: 'red'}}>
                {this.props.error}
            </div>
            }
            <div style={{float: 'left', width: '275px'}}>
                <span>Сумма к оплате</span>
                <h3>{`${this.state.sum} ${CURRENCY}`}</h3>
            </div>
            <div style={{float: 'left', width: '275px'}}>
                <span>Без учета комиссии</span>
                <h5>{`${this.state.sumWithOutCommission} ${CURRENCY}`}</h5>
            </div>
            <div style={{float: 'left', width: '275px'}}>
                <span>Размер комиссии</span>
                <h5>{`${this.state.commission} ${CURRENCY}`}</h5>
            </div>
            <div style={{float: 'left', width: '300px', marginTop: '25px'}}>
                <button onClick={this._pay} disabled={this.props.loading}>Оплатить</button>
            </div>
        </div>
}

export default connect(
    ({payInvoices}) => ({
        loading: payInvoices.get('payInvoiceLoading'),
        transactionsResult: payInvoices.get('transactionsResult'),
        error: payInvoices.get('payInvoiceError'),
    }),
    {payInvoice}
)(Pay);