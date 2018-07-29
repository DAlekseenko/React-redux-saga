import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {Roller} from '../../Loading'
import UserDataForm from './UserDataForm'

import {mapToArr} from "pbr-lib-front-utils/dateManipulation";
import ServiceEntity from '../../../Reducers/Entities/ServiceEntity'
import CategoryEntity from '../../../Reducers/Entities/CategoryEntity'
import { getCategories, categoriesSearch, focusService, createUserData } from '../../../Reducers/AC/accountsAC'
import { pushLocation } from '../../../Reducers/AC/commonAC'

/**
 * @property {Array<ServiceEntity>} props.services
 * @property {Array<CategoryEntity>} props.categories
 * @property {ServiceEntity} props.focusedService
 */
class Search extends Component {
    static propTypes = {
        parentId: PropTypes.string,
        search: PropTypes.string,
        location: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.string
    }

    state = {
        search: ''
    }

    onChange = ({target}) => {
        this.setState({search: target.value})
    }

    onSubmit = e => {
        e.preventDefault()
        const {parentId, pushLocation} = this.props
        pushLocation(`/accounts/${parentId}/${this.state.search}`);
    }

    onServiceClick = serviceId => e => {
        e.preventDefault()
        this.props.focusService(serviceId)
    }

    onUserDataCreate = service_id => (identifier, description) => {
        this.props.createUserData(service_id, identifier, description)
    }

    componentWillReceiveProps() {
        this.setState({search: this.props.search})
    }

    renderCategories() {
        return this.props.categories.map(category => (
            <div key={category.getId()}><Link to={`/accounts/${category.getId()}/`}>{category.getName()}</Link></div>
        ))
    }
    renderServices() {
        return this.props.services.map(service => (
            <div key={service.getId()}>
                <a href='#' onClick={this.onServiceClick(service.getId())}>{service.getName()}</a>
            </div>
        ))
    }

    renderContent() {
        if (this.props.loading) {
            return <Roller/>
        }
        if (this.props.error) {
            return <div>{this.props.error}</div>
        }

        return <div>
            <div>Категории:</div> {this.renderCategories()}
            <div>Сервисы:</div> {this.renderServices()}
        </div>
    }

    renderFocused() {
        const service = this.props.focusedService

        return <div>выбранный сервис:
            <div style={{display: 'flex'}}>
                <div>{this.renderServices()}</div>
                <UserDataForm key={service.getId()} onSubmit={this.onUserDataCreate(service.getId())} service={service} />
            </div>
        </div>
    }

    render() {
        if (this.props.focusedService !== null) {
            return this.renderFocused()
        }

        return <div>элементы списка:
            <form onSubmit={this.onSubmit}>
                <fieldset disabled={this.props.loading}>
                    <input value={this.state.search} onChange={this.onChange}/><input type='submit' value='Найти' />
                </fieldset>
            </form>
            {this.renderContent()}
        </div>
    }
}

export default connect(
    ({accounts}) => ({
        services: mapToArr( accounts.get('services'), ServiceEntity ),
        categories: mapToArr( accounts.get('categories'), CategoryEntity ),
        loading: accounts.get('searchLoading'),
        error: accounts.get('searchError'),
        focusedService: accounts.get('focusedService') ? new ServiceEntity(accounts.get('focusedService')) : null
    }),
    {
        categoriesSearch, getCategories, pushLocation, focusService, createUserData
    }
)(Search)