import React from 'react';

export const PrintHistoryItem = ({historyItem: {category_name, service_name, date_pay, sum, total_sum, commission, fields, erip_data = {}, currency, server_time, user}}) => {

    const style = {
        invoiceHeader: {fontSize: '22px', color: '#F44336'},
        invoiceContent: {fontFamily: 'Courier New', fontSize: '14px', width: '600px', margin: '30px 10px'},
        invoiceLine: {marginTop: '2px'},
        '-align-right': {float: 'right'},
        '-align-center': {textAlign: 'center'},
        '-margin-bottom': {marginBottom: '14px'}
    }

    const getFields = fields => fields.map(({name, value}, key) => {
        if (name && value) {
            return <div key={key} style={style.invoiceLine}>
                {name}: <span style={style['-align-right']}>{value}</span>
            </div>
        }
    })
    return (
        <div>
            <div style={style.invoiceHeader}>Ваш счет</div>
            <div style={style.invoiceContent}>
                <div style={style.invoiceLine}>Дата платежа:
                    <span style={style['-align-right']}>{date_pay}</span>
                </div>
                {erip_data && erip_data.eripResult &&
                <div style={style.invoiceLine}>
                    Номер плательщика ЕРИП: {erip_data.eripResult.eripPayerCode}
                </div>}
                {user &&
                <div style={style.invoiceLine}>
                    Номер абонента МТС: {user.phone}
                </div>}
                <div style={style.invoiceLine}>
                    Время сервера: {server_time}</div>
                {erip_data && erip_data.paymentInfo.sender &&
                <div style={style.invoiceLine}>
                    Отправитель платежа: {erip_data.paymentInfo.sender}</div>}
                {erip_data && erip_data.paymentInfo.receiver &&
                <div style={style.invoiceLine}>
                    Получатель платежа: {erip_data.paymentInfo.receiver}</div>}
                <div style={Object.assign(Object.create(style.invoiceLine), style['-align-center'])}>
                    {category_name} {service_name}
                </div>
                {getFields(fields)}
                <div style={style.invoiceLine}>Сумма:
                    <span style={style['-align-right']}>{`${sum} ${currency}`}</span>
                </div>
                <div style={style.invoiceLine}>Сумма вознаграждения:
                    <span style={style['-align-right']}>{`${commission} ${currency}`}</span>
                </div>
                <div style={Object.assign(Object.create(style.invoiceLine), style['-margin-bottom'])}>Сумма всего:
                    <span style={style['-align-right']}>{`${total_sum} ${currency}`}</span>
                </div>
                {erip_data && erip_data.eripResult &&
                <div style={style.invoiceLine}>ПN операции в ЕРИП: {erip_data.eripResult.eripOperationNumber}</div>}
                <div style={style.invoiceLine}>Тел. ЕРИП для справок: 141</div>
            </div>
            <div>С уважением,<br/>
                СООО "Мобильные ТелеСистемы"
            </div>
        </div>
    )
}