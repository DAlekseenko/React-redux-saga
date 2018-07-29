import React, {Component} from 'react';
import {connect} from "react-redux"

import FormGroup from "../Partials/FormGroup"
import {addFavorite} from "../../../Reducers/AC/favoritesAC"
import PropTypes from 'prop-types'

export class AddFavorite extends Component {

    state = {
        name: '',
        success: false,
        fail: false,
        errors: {}
    }

    static propTypes = {
        payment_key: PropTypes.string.isRequired,
        onClose: PropTypes.func,
        block: PropTypes.number
    }

    componentWillReceiveProps(nextProps) {

        const {errors, fail, success} = nextProps

        this.setState({errors: errors || {}, fail: fail || false, success: success || false})

        if ((fail || success) && this.props.onClose)
            setTimeout(() => {
                this.props.onClose()
            }, 1000)
    }


    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    _onSubmit = (e) => {
        e.preventDefault()
        const {state: {name}, props: {payment_key}} = this
        this.props.addFavorite({key: payment_key, name})
    }

    render() {

        let rendering =
            <form onSubmit={this._onSubmit} style={{display: 'grid'}}>
                <FormGroup onChange={this._onChange} name='name' errors={this.state.errors}
                           placeholder={'Название'} value={this.state.name}/>
                <button type='submit'>Сохранить</button>
            </form>

        if (this.state.success) {
            rendering = <span>Платеж добавлен в избранное</span>
        }

        if(this.state.fail) {
            rendering = <span>Ошибка добавления</span>
        }

        return (
            <div className="popover">
                {rendering}
            </div>
        )
    }
}


export default connect(
    (s => ({
        loading: s.favorites.get('loading'),
        errors: s.favorites.get('errors'),
        success: s.favorites.get('success'),
        fail: s.favorites.get('fail')
    })),
    {addFavorite}
)(AddFavorite)

