import React from 'react'
import PropTypes from 'prop-types'

import CategoriesBreadcrumbs from '../Categories/CategoriesBreadcrumbs.jsx'
import CategoryEntity from '../../../Reducers/Entities/CategoryEntity'

export default class ServiceBreadcrumbs extends CategoriesBreadcrumbs {
    static propTypes = {
        path: PropTypes.arrayOf(PropTypes.instanceOf(CategoryEntity)),
        name: PropTypes.string,
        link: PropTypes.string,
        service_name: PropTypes.string,
        service_link: PropTypes.string
    }

    static defaultProps = {
        path: []
    }

    getBreadcrumbsData() {
        let list = super.getBreadcrumbsData()

        const {service_name, service_link} = this.props

        if (service_name) {
            list.push({id: 'breadcrumbs_service_id', name: service_name, link: service_link})
        }

        return list;
    }
}
