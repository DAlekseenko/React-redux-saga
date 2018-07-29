import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import CategoryEntity from '../../../Reducers/Entities/CategoryEntity'

export default class CategoriesList extends Component {
    static propTypes = {
        categories: PropTypes.arrayOf(PropTypes.instanceOf(CategoryEntity)),
    }

    _getList = () => this.props.categories.map((item) =>
        <div key={item.getId()} className="category">
            <img src={item.getImg()} alt="Лого"/>
            <Link to={`/categories/${item.getId()}`}>
                {item.getName()}
            </Link>
        </div>
    )

    render() {
        if (this.props.categories.length == 0) {
            return null;
        }
        return (
            <section>
                <h5 style={{width:'100%'}}>Категории</h5>
                <div className='category_wrap'>{this._getList()}</div>
            </section>
        )
    }
}


