import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {AssistRecord} from '../../../Reducers/entities';

export default class RechargeInfoView extends Component {


    static propTypes = {
        status: PropTypes.bool.isRequired,
        model: PropTypes.instanceOf(AssistRecord)
    }

    /** TODO реализовать текст успеха не успеха. в случае если будет в новом дизайне.
     <div class="status-page_description --desc"
     <?= empty($transactions) ? '' : 'data-success="Оплата ' . ($plural ? 'счетов' : 'услуги') . ' прошла успешно"

     data-fail="Баланс мобильного телефона будет пополнен в ближайшее время. При поступлении средств на счет мобильного телефона, пожалуйста, повторите попытку оплаты"' ?> >

     <?= empty($transactions) ?
     'Пополнение мобильного телефона с карты' :
     'Списание с карты прошло успешно, ожидайте пополнения баланса мобильного телефона и оплату '
     . ($plural ? 'счетов' : 'услуги') . '. По факту оплаты ' . ($plural ? 'счетов' : 'услуги') . ' вы получите СМС-сообщение'
     ?>
     </div>
     */

    render() {
        const {status, model, loaded} = this.props;

        let info;


        if (status && (model.with_services && model.pay_services_result)) {
            info = <div className="status-page_footer_text">
                Чтобы посмотреть квитанцию об оплате, нажмите «Продолжить»*
            </div>
        }

        return <div className="status-page">
            <span>{status ? 'Ok' : 'Fail'}</span>
            <h1 className="status-page_header">{status ? 'Завершено успешно' : 'Отказ в авторизации'}</h1>

            {loaded &&
            <div>
                <div className="payment-result">
                    <div className="payment-result_item -w-37">
                        <h5 className="-pb3">Сумма операции</h5>
                        <h3>{model.sum} {model.currency}</h3>
                    </div>
                    <div className="payment-result_item -w-37">
                        <h5 className="-pb3">Уникальный номер операции</h5>
                        <h3>{model.billnumber}</h3>
                    </div>
                    <div className="payment-result_item -w-26">
                        <h5 className="-pb3">Дата операции</h5>
                        <h3>{model.orderdate}</h3>
                    </div>
                </div>
                <div className="status-page_advanced">
                    <a className="status-page_advanced-text -dotted --advanced" data-hide-text="Показать детали"
                       data-show-text="Скрыть детали">Дополнительные Детали</a>
                </div>
                <hr/>
                <div>
                    <div className="payment-result_item -w-37">
                        <h5 className="-pb3">Код авторизации:</h5>
                        <h3>{model.approvalmodel}</h3>
                    </div>
                    <div className="payment-result_item -w-37">
                        <h5 className="-pb3">Держатель карты:</h5>
                        <h3>{model.cardholder}</h3>
                    </div>
                    <div className="payment-result_item -w-26">
                        <h5 className="-pb3">Платежное средство:</h5>
                        <h3>{model.meannumber} {model.meantypename}</h3>
                    </div>
                    <div className="payment-result_item -w-37">
                        <h5 className="-pb3">Номер транзакции:</h5>
                        <h3>{model.order_number}</h3>
                    </div>
                    <div className="payment-result_item -w-37">
                        <h5 className="-pb3">Покупатель:</h5>
                        <h3>{model.firstname} {model.lastname}</h3>
                    </div>
                    <div className="payment-result_item -w-26">
                        <h5 className="-pb3">Детали платежа:</h5>
                        <h3>{model.message}</h3>
                    </div>
                </div>
                <div className="status-page_footer">
                    {info}
                </div>
                {/*<div><a href="{redirect}"><?= \common\helpers\Html::mtsButton(' Продолжить') ?></a></div>*/}
            </div>
            }
        </div>
    }
}

