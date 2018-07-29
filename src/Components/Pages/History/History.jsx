import React from 'react';
import {connect} from 'react-redux';
import {mapToArr} from 'pbr-lib-front-utils/dateManipulation'

import PageComponent from "../../App/PageComponent"
import PageLayout from '../../Decorators/PageLayout'
import {HistoryForm} from './index'
import {Link} from 'react-router-dom'
import {historySetSearch} from '../../../Reducers/AC/payHistoryAC'
import {payHistoryRecord} from '../../../Reducers/entities'
import Popover from "../Partials/Popover"
import {AddFavorite} from "../Favorites"


export class History extends PageComponent {

    state = {
        date_from: '',
        date_to: '',
        popoverOpen: false
    }

    componentDidMount() {
        this.setState(this.props.searchFields)
    }

    componentWillReceiveProps(nextProps) {
        const {date_from = '', date_to = ''} = nextProps.searchFields;
        this.setState({date_from, date_to})
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value})
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.props.historySetSearch(this.state)
    }

    _onOpen = key => e => {
        this.setState({popoverOpen: this.state.popoverOpen === key ? false : key})
    }

    _onClose = key => e => {
        if (this.state.popoverOpen === key) {
            this.setState({popoverOpen: false})
        }
    }

    getHistoryItems = () => this.props.historyList.map((item, i) =>
        <div key={i} className='history-items'>
            <span className='history-items_link'>
                <Link to={`/history-items/${item.transaction_uuid}`}>{item.item_name}</Link>
            </span>
            <span className='history-items_sum'>{item.sum}</span>
            <span className='history-items_status'>{item.status}</span>
            <Popover open={i === this.state.popoverOpen} onClose={this._onClose(i)}>
                <button className="button" onClick={this._onOpen(i)}>Добавить в Изб</button>
                <AddFavorite payment_key={item.key} onClose={this._onClose(i)}/>
            </Popover>
        </div>)


    render = () =>
        <div>
            <HistoryForm onSubmit={this._onSubmit} onChange={this._onChange} {...this.state}/>
            {this.getHistoryItems()}
        </div>
}

export default connect(
    (s => ({
        historyList: mapToArr(s.payHistory.get('historyList'), payHistoryRecord),
        searchFields: s.payHistory.get('searchFields'),
        loading: s.payHistory.get('HlLoading')
    })),
    {historySetSearch}
)(PageLayout(History))