import React from 'react';
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"
import FieldsAttributesRecord from "../../../Reducers/Entities/FieldsAttributesRecord"
import TeaserRecord from "../../../Reducers/Entities/TeaserRecord"
import {MapFormGroup} from "../Partials"
import {recharge} from "../../../Reducers/AC/assistAC"
import Recharge from "./Recharge"
import {Teaser} from "./"


export class RechargeWithTeaser extends Recharge {

    static propTypes = {
        fields: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        teaser: PropTypes.instanceOf(TeaserRecord),
        uuids: PropTypes.string.isRequired,
        errors: PropTypes.object,
    }

    componentWillMount() {
        super.componentWillMount()
        this.setState({'sum': this.props.teaser.Params.get('sum'), 'uuids': this.props.uuids})
    }

    render = () =>
        <div>
            <div style={{color: 'red'}}>{this.props.servError}</div>
            <form onSubmit={this._onSubmit} onInvalid={this._onInValid}>
                <MapFormGroup fields={this.props.fields} state={this.state} onChange={this._onChange}/>
                <Teaser teaser={this.props.teaser} onChange={this._onChange} sum={this.state.sum}/>
                <button disabled={this.props.loading}>Выполнить</button>
            </form>
        </div>

}


export default connect(
    ({payInvoices, auth, assist}) => ({
        fields: mapToArr(payInvoices.get('fields'), FieldsAttributesRecord),
        teaser: new TeaserRecord(payInvoices.get('teaser')),
        uuids: payInvoices.get('transactionUuids'),
        loading: assist.get('rechargeLoading'),
        user: auth.get('user'),
        errors: assist.get('fieldErrors'),
        servError: assist.get('error')
    }), {recharge}
)(RechargeWithTeaser);