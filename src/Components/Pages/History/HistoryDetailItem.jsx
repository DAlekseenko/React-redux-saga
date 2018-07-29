import React from 'react';
import {connect} from 'react-redux';
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"

import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import {mailSender} from "../../../Reducers/AC/mailSenderAC"
import {payHistoryRecord} from "../../../Reducers/entities"
import {getHistoryItems} from "../../../Reducers/AC/payHistoryAC"
import {HistoryItem} from "../History/index"
import {Roller} from "../../Loading"

export class HistoryDetailItem extends PageComponent {


    state = {
        popoverOpen: false
    }

    _onOpen = key => _ => {
        this.setState({popoverOpen: this.state.popoverOpen === key ? false : key})
    }

    _onClose = key => _ => {
        if (this.state.popoverOpen === key) {
            this.setState({popoverOpen: false})
        }
    }

    componentDidMount() {
        const {historyItems, historyLoader, transaction_uuids} = this.props
        if (!historyItems.length || historyItems.some((item => item.status === 'IN_PROCESS'))) {
            historyLoader({transaction_uuids})
        }
    }

    getHistoryBlocks = ({historyItems, sending, mailSection, mailSender, user}) =>
        historyItems.length && historyItems.map((historyItem, key) =>
        <HistoryItem key={key}
                     historyItem={historyItem}
                     user={user}
                     onOpen={this._onOpen(key)}
                     onClose={this._onClose(key)}
                     sending={sending}
                     mailSection={mailSection}
                     mailSender={mailSender}
                     popoverOpen={this.state.popoverOpen === key}
        />) || <div className="error-block">Транзакция не найдена</div>

    render() {
        const {error, loaded, loading} = this.props

        let render = <div>
            <h1>Квитанции об оплате</h1>
            {loaded && this.getHistoryBlocks(this.props)}
        </div>
        if (loading) {
            render = <Roller/>
        }
        if (error) {
            render = <div className="error-block">{error}</div>
        }
        return render;
    }
}

function mapStateToProps(s, p) {
    const {transaction_uuids} = p.match.params
    const historyItems = s.payHistory.get('historyItems').filter((item, key) => transaction_uuids.includes(key))
    return {
        historyItems: mapToArr(historyItems, payHistoryRecord),
        transaction_uuids,
        loading: s.payHistory.get('HILoading'),
        loaded: s.payHistory.get('HILoaded'),
        error: s.payHistory.get('HIError'),
        sending: s.mailSender.get('sending'),
        mailSection: s.mailSender.get('mailSection'),
        user: s.auth.get('user')
    }
}

export default connect(
    (mapStateToProps), {historyLoader: getHistoryItems, mailSender}
)(PageLayout(HistoryDetailItem))