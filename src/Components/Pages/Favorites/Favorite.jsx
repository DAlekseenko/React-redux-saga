import React from 'react';
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import FormGroup from "../Partials/FormGroup"
import PageLayout from "../../Decorators/PageLayout"
import {updateFavorite} from "../../../Reducers/AC/favoritesAC"
import {Link} from "react-router-dom"
import PageComponent from "../../App/PageComponent"
import {FavoritesRecord} from "../../../Reducers/entities"
import {Roller} from "../../Loading"
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import DialogDefaultValues from "../../../Services/Dialog/DialogDefaultValues"

export class Favorite extends PageComponent {

    static propTypes = {
        favorite: PropTypes.instanceOf(FavoritesRecord)
    }

    state = {
        name: '',
        service_id: '',
        errors: {}
    }

    componentWillMount() {
        super.componentWillMount()
        const {favorite} = this.props
        if (this.props.favorite.get('name')) {
            this.setState({
                name: favorite.get('name'),
                service_id: favorite.get('service_id')
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.errors);
        nextProps.errors && !this.state.name && this.setState({errors: nextProps.errors});
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}});
    }

    _onSubmit = (e) => {
        e.preventDefault()
        const {state: {name}, props: {id}} = this
        this.props.updateFavorite({id, name})
    }

    _onInValid = (e) => {
        e.preventDefault()
        for (let {validationMessage, name} of e.target.form.elements) {
            validationMessage && this.setState(setFieldError(this.state, name, validationMessage))
        }
    }

    render() {
        let render = <div><Roller/></div>

        if (!this.props.loading && !this.state.name) {
            render = <div>Избранное c ID = {this.props.id} не найденно</div>
        }
        if (!this.props.loading) {
            render =
                <div>
                    <form onSubmit={this._onSubmit} onInvalid={this._onInValid}>
                        <FormGroup onChange={this._onChange} name='name' errors={this.state.errors}
                                   label={'Название'} value={this.state.name} required={true}/>
                        <button type='submit'>Сохранить</button>
                    </form>
                    <Link
                        to={DialogDefaultValues.setDefaultParamsToString(`/payments/${this.state.service_id}`, this.props.favorite.get('fields'))}>
                        <i>Повторить платеж</i>
                    </Link>
                </div>
        }
        return render;
    }
}

export default connect(
    ({favorites}, {match: {params: {id}}}) => ({
        favorite: FavoritesRecord(favorites.get('favorites').get(Number(id))),
        errors: favorites.get('errors'),
        id
    }),
    {updateFavorite}
)(PageLayout(Favorite))