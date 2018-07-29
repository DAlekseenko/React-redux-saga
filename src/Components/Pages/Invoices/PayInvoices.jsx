import React from 'react';
import {connect} from 'react-redux';
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"

import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import {Invoice} from './';
import Pay from './Pay'
import InvoiceEntity from "../../../Reducers/Entities/InvoiceEntity"
import RechargeWithTeaser from "../Assist/RechargeWithTeaser"
import {Roller} from "../../Loading"
import {getRechargeRequirement} from "../../../Reducers/AC/payIvoicesAC"

@connect(mapStateToProps, {getRechargeRequirement})
export class PayInvoices extends PageComponent {

    getHistoryBlocks = () => this.props.invoices.map((invoice, key) => <Invoice key={key} invoice={invoice}/>)

    render() {
        const {loading, directPay, invoices} = this.props;

        let teaser = <div style={{color: 'red'}}>Не все счета могут быть оплачены!</div>;

        if (directPay !== null) {
            teaser = directPay ? <Pay invoices={invoices}/> : <RechargeWithTeaser/>
        }

        if (invoices.length) {
            return <div>
                <h1>Оплатить счета</h1>
                {this.getHistoryBlocks()}
                {!loading ? teaser : <Roller/>}
            </div>
        }

        return <div style={{color: 'red'}}>Не одного счета для оплаты не найдено</div>
    }
}

function mapStateToProps({accounts, payInvoices}, p) {
    const transaction_uuids = p.match.params.transaction_uuids
    const invoices = accounts.get('invoices').filter(item => transaction_uuids.includes(item.get('transaction_uuid')))
    return {
        invoices: mapToArr(invoices, InvoiceEntity),
        directPay: payInvoices.get('directPay'),
        loading: payInvoices.get('requirementLoading')
    }
}

export default PageLayout(PayInvoices);