import {REAL_IP} from "../../CONSTANTS";
import BaseApiCaller from './BaseApiCaller';
import * as msg from './Messages';

export default class ApiCaller extends BaseApiCaller {

    /**
     * @param {string} method
     * @param {{}} params
     * @param {AbstractApiParamsContainer} paramsContainer
     */
    constructor(method, params, paramsContainer) {
        super();
        this.url = paramsContainer.getUrl()
        this.message = this.createMessage(method, params, paramsContainer)
        this.createConfig(paramsContainer)
    }

    createConfig(paramsContainer) {
        if (paramsContainer.hasIP()) {
            this.config.headers[REAL_IP] = paramsContainer.getIP()
        }
    }

    createMessage(method, params, container) {
        switch (method) {
            case msg.MessageGetLocation.METHOD:
                return (new msg.MessageGetLocation()).getMessage()

            case msg.MessageGetService.METHOD:
                return (new msg.MessageGetService(params.id)).getMessage()

            case msg.MessageGetCategories.METHOD:
                return (new msg.MessageGetCategories(params.id, container.getLocationId())).getMessage()

            case msg.MessageSearchCategories.METHOD:
                return (new msg.MessageSearchCategories(params.searchQuery, params.id, container.getLocationId())).getMessage()

            case msg.MessageSendPassword.METHOD:
                return (new msg.MessageSendPassword(container.getToken(), params.phone)).getMessage()

            case msg.MessageSearchAutoCompleteCategories.METHOD:
                return (new msg.MessageSearchAutoCompleteCategories(params.value, params.category_id, container.getLocationId())).getMessage()

            case msg.MessageGetUser.METHOD:
                return (new msg.MessageGetUser(container.getToken())).getMessage()

            case msg.MessageLoginUser.METHOD:
                return (new msg.MessageLoginUser(params.phone, params.password, container.getLocationId())).getMessage()

            case msg.MessageGetDescription.METHOD:
                return (new msg.MessageGetDescription()).getMessage()

            case msg.MessageSendMail.METHOD:
                return (new msg.MessageSendMail(params.recipient, params.key)).getMessage()

            case msg.MessageGetHistory.METHOD:
                return (new msg.MessageGetHistory(container.getToken(), params.date_from, params.date_to)).getMessage()

            case msg.MessageGetHistoryItems.METHOD:
                return (new msg.MessageGetHistoryItems(params.transaction_uuids)).getMessage()

            case msg.MessageGetSlider.METHOD:
                return (new msg.MessageGetSlider(container.getToken(), container.getLocationId())).getMessage()

            case msg.MessageChangePassword.METHOD:
                return new msg.MessageChangePassword(container.getToken(), params.password, params.passwordRepeat).getMessage()

            case msg.MessageSetProfile.METHOD:
                return new msg.MessageSetProfile(container.getToken(), params.first_name, params.last_name, params.patronymic).getMessage()

            case msg.MessageUserAgreement.METHOD:
                return new msg.MessageUserAgreement().getMessage()

            case msg.MessageTotalLogout.METHOD:
                return new msg.MessageTotalLogout(container.getToken()).getMessage()

            case msg.MessageDelSubscription.METHOD:
                return new msg.MessageDelSubscription(container.getToken()).getMessage()

            case msg.MessageSetLocation.METHOD:
                return (new msg.MessageSetLocation(container.getToken(), container.getLocationId())).getMessage()

            case msg.MessageEripDialog.METHOD:
                return new msg.MessageEripDialog(container.getToken(), params.id, params.mts_session, params.fields, params.otherFields).getMessage()

            case msg.MessageGetFavorites.METHOD:
                return new msg.MessageGetFavorites(container.getToken()).getMessage()

            case msg.MessageAddFavorite.METHOD:
                return new msg.MessageAddFavorite(container.getToken(), params.key, params.name).getMessage()

            case msg.MessageUpdateFavorite.METHOD:
                return new msg.MessageUpdateFavorite(container.getToken(), params.id, params.name).getMessage()

            case msg.MessageDelFavorite.METHOD:
                return new msg.MessageDelFavorite(container.getToken(), params.id).getMessage()

            case msg.MessageCreateUserData.METHOD:
                return (new msg.MessageCreateUserData(container.getToken(), params.service_id, params.identifier, params.description)).getMessage()

            case msg.MessageGetUserData.METHOD:
                return (new msg.MessageGetUserData(container.getToken())).getMessage()

            case msg.MessageDeleteUserData.METHOD:
                return (new msg.MessageDeleteUserData(container.getToken(), params.id)).getMessage()

            case msg.MessageEditUserData.METHOD:
                return (new msg.MessageEditUserData(container.getToken(), params.id, params.identifier, params.description)).getMessage()

            case msg.MessageGetFavoriteItem.METHOD:
                return new msg.MessageGetFavoriteItem(container.getToken(), params.favId).getMessage()

            case msg.MessageGetRequirement.METHOD:
                return new msg.MessageGetRequirement(container.getToken(), params.transaction_uuids).getMessage()

            case msg.MessageRecharge.METHOD:
                return new msg.MessageRecharge(container.getToken(), params.first_name, params.last_name, params.email, params.sum, params.uuids).getMessage()

            case msg.MessageRechargeInfo.METHOD:
                return new msg.MessageRechargeInfo(container.getToken(), params.ordernumber).getMessage()

            case msg.MessageGetInvoices.METHOD:
                return new msg.MessageGetInvoices(container.getToken()).getMessage()

            case msg.MessagePayInvoice.METHOD:
                return new msg.MessagePayInvoice(container.getToken(), params.transaction_uuids).getMessage()

            case msg.MessageGetBalance.METHOD:
                return new msg.MessageGetBalance(container.getToken()).getMessage()

            case msg.MessageGetRechargeModel.METHOD:
                return new msg.MessageGetRechargeModel(container.getToken()).getMessage()

            case msg.MessageGetSocial.METHOD:
                return new msg.MessageGetSocial().getMessage()

            case msg.MessageGetInvoiceUserData.METHOD:
                return new msg.MessageGetInvoiceUserData(container.getToken(), params.invoiceId).getMessage()

            default:
                throw Error('Message for method ' + method + ' was not found')
        }
    }
}
