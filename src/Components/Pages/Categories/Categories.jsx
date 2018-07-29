import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PageComponent from "../../App/PageComponent"
import PageLayout from '../../Decorators/PageLayout'
import Search from './CategoriesSearch.jsx'

import CategoriesBreadcrumbs from './CategoriesBreadcrumbs'
import Title from './Title'

import CategoryEntity from '../../../Reducers/Entities/CategoryEntity'
import ServiceEntity from '../../../Reducers/Entities/ServiceEntity'

import {ServicesList, CategoriesList} from './index'

class Categories extends PageComponent {
    static propTypes = {
        categories: PropTypes.arrayOf(PropTypes.instanceOf(CategoryEntity)),
        services: PropTypes.arrayOf(PropTypes.instanceOf(ServiceEntity)),
        path: PropTypes.arrayOf(PropTypes.instanceOf(CategoryEntity)),
    }

    render() {
        return <div>
            <CategoriesBreadcrumbs path={this.props.path} name="Платежи" link="/" />
            <Title path={this.props.path} />
            <Search />
            <CategoriesList categories={this.props.categories} />
            <ServicesList services={this.props.services} />
        </div>
    }
}

export default connect(
    ({categories}) => ({
        categories: categories.getCategories(),
        services: categories.getServices(),
        path: categories.getCategoriesPath(),
    })
)(PageLayout(Categories))




