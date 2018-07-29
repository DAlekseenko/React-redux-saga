import React, {Component} from 'react';
import PropTypes from "prop-types"

import CategoryEntity from '../../../Reducers/Entities/CategoryEntity'

export default class Title extends Component {

    static propTypes = {
        defaultTitle: PropTypes.string,
        path: PropTypes.arrayOf(PropTypes.instanceOf(CategoryEntity))
    }

    static defaultProps = {
        defaultTitle: 'Все платежи',
        path: []
    }

    getTitle() {
        return this.props.path.length === 0 ? this.props.defaultTitle : this.props.path.slice(-1)[0].getName() ;
    }

    render() {
        return <h1>{this.getTitle()}</h1>
    }
}