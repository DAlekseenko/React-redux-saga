import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types"

import PageLayout from "../../Decorators/PageLayout"
import {recharge} from "../../../Reducers/AC/assistAC"

import {MapFormGroup} from "../Partials"
import Recharge from "./Recharge"
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"
import FieldsAttributesRecord from "../../../Reducers/Entities/FieldsAttributesRecord"
import {Roller} from "../../Loading"


@connect(mapStateToProps, {recharge})
export default PageLayout(class RechargePhone extends Recharge {

    static propTypes = {
        data: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        errors: PropTypes.object,
    }

    render = () =>
        <div>
            <h1>{this.title}</h1>
            {this.props.rechargeModelLoading ? <Roller width="50px"/> : [
                <div key="1" style={{color: 'red'}}>{this.props.servError}</div>,
                <form key="2" onSubmit={this._onSubmit} onInvalid={this._onInValid}>
                    <MapFormGroup fields={this.props.data} state={this.state} onChange={this._onChange}/>
                    <button disabled={this.props.loading}>Продолжить</button>
                </form>
            ]}
        </div>
})

function mapStateToProps({payInvoices, auth, assist}) {
    return {
        data: mapToArr(payInvoices.get('fields'), FieldsAttributesRecord),
        loading: assist.get('rechargeLoading'),
        rechargeModelLoading: payInvoices.get('rechargeModelLoading'),
        user: auth.get('user'),
        errors: assist.get('fieldErrors'),
        servError: assist.get('error')
    }
}
