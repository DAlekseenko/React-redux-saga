import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import PageLayout from '../../Decorators/PageLayout'
import {requestInDialog} from '../../../Reducers/AC/eripDialogAC'
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import ServiceBreadcrumbs from './ServiceBreadcrumbs'
import Title from '../Categories/Title'

import {DialogMap} from "./index"
import DialogFieldPreparer from "../../../Services/Dialog/DialogFieldPreparer"
import PageComponent from "../../App/PageComponent"
import DialogPrepareRenderFields from "../../../Services/Dialog/DialogPrepareRenderFields"
import ContinueDialog from "./ContinueDialog"
import DialogDefaultValues from "../../../Services/Dialog/DialogDefaultValues"

import ServiceEntity from '../../../Reducers/Entities/ServiceEntity'

/**
 * @property {ServiceEntity} props.service
 */
export class Dialog extends PageComponent {
    /** @todo дописать PropTypes */
    static propTypes = {
        service: PropTypes.instanceOf(ServiceEntity)
    }

    state = {
        errors: {},
        agreement: false,
        agreement_error: ''
    }

    componentWillMount() {
        this.valueContainer = new DialogDefaultValues(this.props.history.location.search);
    }

    componentWillReceiveProps(nextProps) {
        const {entities, errors} = nextProps;

        const prepareFields = new DialogPrepareRenderFields(entities.slice(this.props.entities.size), this.valueContainer)

        this.setState(prepareFields.fieldsState);

        errors && this.setState({errors})
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    _onCheck = ({target: {name, checked}}) => {
        this.setState({[name]: Number(checked), errors: {}})
    }

    _onSubmit = () => {
        const {mts_session, requestInDialog, entities, match: {params: {id}}} = this.props

        const prepareFields = new DialogFieldPreparer(this.state, entities);

        if (prepareFields.fieldError) {
            this.setState(prepareFields.fieldError)
            return false;
        }
        requestInDialog({
            id,
            mts_session,
            fields: prepareFields.originalFields,
            otherFields: prepareFields.otherFields
        })
    }

    _onInValid = (e) => {
        e.preventDefault()
        for (let {validationMessage, name} of e.target.form.elements) {
            validationMessage && this.setState(setFieldError(this.state, name, validationMessage))
        }
    }

    _onConfirm = (e) => {
        e.preventDefault();
        if (this.props.subscription.agreement_required && !this.state.agreement) {
            this.setState({agreement_error: "Для проведения платежа необходимо подтвердить согласие на подключение услуги «МТС Деньги»"})
            return false
        }
        this._onSubmit()
    }

    _onConfirmAgreement = ({target: {name, checked}}) => {
        this.setState({[name]: checked, agreement_error: null})
    }

    renderHeader() {
        const service = this.props.service

        if (!service.getId()) {
            return null
        }
        return <div >
            <ServiceBreadcrumbs path={service.getParents()} name="Платежи" link="/" service_name={service.getName()} />
            <Title defaultTitle={service.getName()} />
        </div>
    }

    render = () => {
        return (
            <div>
                {this.renderHeader()}
                {this.props.fault && <h3 style={{backgroundColor: 'red'}}>{this.props.fault}</h3>}
                <form onInvalid={this._onInValid} onSubmit={this._onConfirm}>
                    <DialogMap {...this.props} payState={this.state} onChange={this._onChange}
                               onCheck={this._onCheck}/>
                    <ContinueDialog showButt={!!this.props.entities.size}
                                    subscription={this.props.subscription}
                                    agreement={this.state.agreement}
                                    agreement_error={this.state.agreement_error}
                                    onCheck={this._onConfirmAgreement}
                                    loading={this.props.loading}/>
                </form>
            </div>)
    }
}

export default connect(
    ({eripDialog, favorites, accounts}) => ({
        entities: eripDialog.get('dialogBlocks'),
        loading: eripDialog.get('loading'),
        mts_session: eripDialog.get('mts_session'),
        fault: eripDialog.get('fault'),
        errors: eripDialog.get('errors'),
        favorite: favorites.get('favorite'),
        invoice: accounts.get('invoiceUserData'),
        subscription: eripDialog.get('subscription'),
        service: new ServiceEntity(eripDialog.get('service'))
    }),
    {requestInDialog}
)(PageLayout(Dialog))




