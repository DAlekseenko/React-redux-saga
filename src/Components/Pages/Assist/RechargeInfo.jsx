import React from 'react';
import {connect} from 'react-redux';
import {RechargeInfoView} from '.';
import {AssistRecord} from "../../../Reducers/entities"
import PageLayout from "../../Decorators/PageLayout"
import {getRechargeInfo} from "../../../Reducers/AC/assistAC"
import PageComponent from "../../App/PageComponent"
import {Roller} from "../../Loading"

export class RechargeInfo extends PageComponent {

    componentWillMount() {
        const {orderNumber, status, loaded, getRechargeInfo} = this.props;
        if (this.isBrowser() && !orderNumber) {
            this.history.replace('/not-found')
        }
        if (!loaded) {
            getRechargeInfo({ordernumber: orderNumber}, status)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {orderNumber, status, loaded, loading} = nextProps;
        if (!loaded && !loading) {
            setTimeout(() => {
                this.props.getRechargeInfo({ordernumber: orderNumber}, status)
            }, 10000);
        }
    }

    render = () => this.props.orderNumber && <RechargeInfoView {...this.props} /> || <Roller/>

}

export default connect(
    ({assist}) => ({
        status: assist.get('status'),
        model: new AssistRecord(assist.get('model')),
        loading: assist.get('rechargeInfoLoading'),
        loaded: assist.get('rechargeInfoLoaded'),
        payServicesResult: assist.get('payServicesResult'),
        withServices: assist.get('withServices'),
        orderNumber: assist.get('orderNumber')
    }),
    {getRechargeInfo}
)(PageLayout(RechargeInfo));