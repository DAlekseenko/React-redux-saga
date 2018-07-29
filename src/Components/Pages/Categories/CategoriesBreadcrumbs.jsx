import React, {Component} from 'react';
import PropTypes from "prop-types"

import Breadcrumbs from '../Partials/Breadcrumbs'

import CategoryEntity from '../../../Reducers/Entities/CategoryEntity'

export default class CategoriesBreadcrumbs extends Component {
    static propTypes = {
        path: PropTypes.arrayOf(PropTypes.instanceOf(CategoryEntity)),
        name: PropTypes.string,
        link: PropTypes.string
    }

    getBreadcrumbsData() {
        const {path, name, link} = this.props

        let list = path.map(category => ({
            id: category.getId(),
            name: category.getName(),
            link: `/categories/${category.getId()}`
        }))

        if (name && link) {
            list.unshift({id: 'breadcrumbs_custom_id', name, link})
        }

        list.unshift({id: 'breadcrumbs_main_id', name: 'Главная', link: '/'})

        return list;
    }

    render() {
        return <Breadcrumbs list={this.getBreadcrumbsData()} />
    }
}
