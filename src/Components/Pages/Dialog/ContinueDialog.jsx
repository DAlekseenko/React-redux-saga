import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Roller} from "../../Loading"
import {Link} from "react-router-dom"

export default class ContinueDialog extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        showButt: PropTypes.bool.isRequired,
        agreement: PropTypes.bool.isRequired,
        onCheck: PropTypes.func.isRequired,
        agreement_error: PropTypes.string
    }


    render() {
        const {loading, showButt, subscription} = this.props

        const button = <input type="submit" value='Отправить'/>

        let render = <Roller parentClass="form-group_field-loading" width={'15px'}/>

        if (!loading) {
            render = showButt ?  button : <div/>
        }
        if (subscription.get('agreement_required')) {
            render =
                <div>
                    <h5>
                        <div>
                            <input type="checkbox" name="agreement" onChange={this.props.onCheck}
                                   checked={this.props.agreement}/>
                            Нажимая «Оплатить», Вы подтверждаете, что ознакомлены и согласны с
                            <Link to="/help/user-agreement" target="_blank">Правилами&nbsp;системы</Link>и
                            подключением
                            услуги
                            «МТС&nbsp;Деньги». <span className="rules_agree-info">{subscription.get('info')}</span>
                        </div>
                        <span style={{marginTop: '10px', color: 'red'}}>{this.props.agreement_error}</span>
                    </h5>
                    {button}
                </div>
        }

        return render
    }
}
