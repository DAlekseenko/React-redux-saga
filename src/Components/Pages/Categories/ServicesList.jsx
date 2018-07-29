import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import ServiceEntity from '../../../Reducers/Entities/ServiceEntity'

export default class ServicesList extends Component {
    static propTypes = {
        services: PropTypes.arrayOf(PropTypes.instanceOf(ServiceEntity)),
    }

    _getList = () => this.props.services.map((item) =>
        <div key={item.getId()} className="category">
            <img src={item.getImg()} alt="Лого"/>
            <Link to={`/payments/${item.getId()}`}>
                {item.getName()}
            </Link>
        </div>
    )

    render() {
        if (this.props.services.length == 0) {
            return null;
        }
        return (
            <section>
                <h5 style={{width:'100%'}}>Сервисы</h5>
                <div className='category_wrap'>{this._getList()}</div>
            </section>
        )
    }
}
