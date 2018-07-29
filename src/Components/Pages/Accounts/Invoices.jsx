import React from 'react'
import PropTypes from 'prop-types'

import {mapToArr} from "pbr-lib-front-utils/dateManipulation";
import {connect} from "react-redux";

import InvoiceEntity from '../../../Reducers/Entities/InvoiceEntity'
import FormGroup from "../Partials/FormGroup"
import PageComponent from "../../App/PageComponent"

/**
 * @property {Array<InvoiceEntity>} props.invoices
 */
class Invoices extends PageComponent {

    static propTypes = {
        invoices: PropTypes.arrayOf(PropTypes.instanceOf(InvoiceEntity))
    }

    state = {
        checkAllInvoice: true,
        payDisabled: false
    }

    componentWillMount() {
        this.setState(this._setInvoiceState())
    }

    _setInvoiceState() {
        const state = {};
        this.props.invoices.map(invoice => {
            state[invoice.getTransactionUuid()] = `${invoice.getSumWithCommission()}_${invoice.getCommission()}`
        })
        return state;
    }

    _onCheck = ({target: {name, checked, value}}) => {
        const state = this.state;
        state[name] = checked ? value : 0

        let check = 0
        this.props.invoices.map(invoice => {
            state[invoice.getTransactionUuid()] && check++
        })

        state.checkAllInvoice = this.props.invoices.length === check
        state.payDisabled = !check
        this.setState(state)
    }

    _allInvoiceCheck = ({target: {name, checked}}) => {
        let state = {};
        if (checked) {
            state = this._setInvoiceState();
            state.checkAllInvoice = true;
            state.payDisabled = false;
        } else {
            for (let name in this.state) {
                state[name] = false
            }
            state.payDisabled = true;
        }
        this.setState(state)
    }

    renderList = () => this.props.invoices.map((invoice, key) =>
        <FormGroup key={key}
                   name={invoice.getTransactionUuid()}
                   wrapperModifier="invoice-form-group"
                   type="checkbox"
                   value={`${invoice.getSumWithCommission()}_ ${invoice.getCommission()}`}
                   label={invoice.getName() + ' ' + invoice.getSumWithCommission()}
                   onChange={this._onCheck}
                   checked={!!this.state[invoice.getTransactionUuid()]}/>
    )

    totalSumBlock = () => {
        let totalSum = 0;
        let sumWithoutCommission = 0;
        let commission = 0;

        this.props.invoices.map(invoice => {
            const state = this.state[invoice.getTransactionUuid()];
            if (state) {
                let [sum, commis] = state.split('_');
                sum = parseFloat(sum);
                commis = parseFloat(commis);
                totalSum += sum + commis
                sumWithoutCommission += sum - commis
                commission += commis
            }
        })

        return <div className="sum-block">
            <FormGroup name="checkAllInvoice"
                       type="checkbox"
                       isNotForm={true}
                       wrapperModifier="sum-block-checkbox"
                       onChange={this._allInvoiceCheck}
                       checked={!!this.state['checkAllInvoice']}/>
            <div className="sum-block-total-sum">
                <h5>Сумма к оплате</h5>
                <h3><span>{totalSum.toFixed(2)}</span> BYN</h3>
            </div>
            <div className="sum-block-no-commission">
                <h5>Без учета комиссии</h5>
                <h3><span>{sumWithoutCommission.toFixed(2)}</span> BYN</h3>
            </div>
            <div className="sum-block-no-commission">
                <h5>Размер комиссии</h5>
                <h3><span>{commission.toFixed(2)}</span> BYN</h3>
            </div>
        </div>
    }

    _pay = () => {
        let uuids = [];
        this.props.invoices.map(invoice => {
            if (this.state[invoice.getTransactionUuid()]) {
                uuids.push(invoice.getTransactionUuid())
            }
        })
        this.history.push('/pay-invoices/' + uuids.join(','))
    }


    render = () => this.props.invoices.length &&
            <div>
                {this.renderList()}
                {this.totalSumBlock()}
                <button onClick={this._pay} disabled={this.state.payDisabled}>Оплатить</button>
            </div> || <div>Нет счетов для оплаты</div>

}

export default connect(
    ({accounts}) => ({
        invoices: mapToArr(accounts.get('invoices'), InvoiceEntity),
    })
)(Invoices)
