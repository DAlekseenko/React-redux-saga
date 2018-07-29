import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SendMail} from "../Partials/SendMail"

export default class SendReceiptToMail extends Component {

    static propTypes = {
        sender: PropTypes.func.isRequired,
        receiptKey: PropTypes.string.isRequired,
        sending: PropTypes.bool.isRequired,
        mailSection: PropTypes.object,
        sectionID: PropTypes.number,
    }
    
    state = {
        email: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        const {mailSection} = nextProps
        mailSection && mailSection.errors && this.setState({errors: mailSection.errors})
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    _onSubmit = (e) => {
        e.preventDefault()
        const {props: {sender, receiptKey, sectionID}, state: {email}} = this
        sender({recipient: email, key: receiptKey}, sectionID)
    }

    render = () => <SendMail onSubmit={this._onSubmit}
                             onChange={this._onChange}
                             value={this.state.recipient}
                             disabled={this.props.sending}
                             success={this.props.mailSection && this.props.mailSection.success}
                             successMsg='Счет отправлен на почту'
                             errors={this.state.errors}/>
}



