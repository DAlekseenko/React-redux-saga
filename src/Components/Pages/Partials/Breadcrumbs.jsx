import React, {Component} from 'react';
import PropTypes from "prop-types"
import {Link} from 'react-router-dom'

export default class Breadcrumbs extends Component {

    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            id:   PropTypes.any,
            name: PropTypes.string,
            link: PropTypes.string
        })).isRequired,
    }

    renderBreadcrumbs() {
        return this.props.list.map(item =>
            <li className="breadcrumbs_item" key={item.id}>
                {item.link ?
                    <Link to={item.link}>{item.name}</Link> : <a>{item.name}</a>}
            </li>
        )
    }

    render() {
        return <ul className="breadcrumbs">{this.renderBreadcrumbs()}</ul>
    }
}
