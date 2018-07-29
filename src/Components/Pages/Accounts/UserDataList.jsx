import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {mapToArr} from "pbr-lib-front-utils/dateManipulation";
import {connect} from "react-redux";

import UserDataFolderEntity from '../../../Reducers/Entities/UserDataFolderEntity'
import {deleteUserData} from '../../../Reducers/AC/accountsAC'
import DialogDefaultValues from "../../../Services/Dialog/DialogDefaultValues"

/**
 * @property {Array<UserDataFolderEntity>} props.userData
 */
class UserDataList extends Component {
    static propTypes = {
        userData: PropTypes.arrayOf(PropTypes.instanceOf(UserDataFolderEntity))
    }

    delete = id => e => {
        e.preventDefault()
        this.props.deleteUserData(id)
    }

    renderFoldersList() {
        return this.props.userData.map(item => (
            <li key={item.getId()}>
                {item.getName()}
                <Link to={`/accounts/${item.getId()}/`}>{item.getPlaceholder() || 'Узнать начисления'}</Link>
                <i>{item.hasChildren() ? null : 'Удалить'}</i>
                <ul>{this.renderServiceList(item)}</ul>
                <hr/>
            </li>
        ));
    }

    /**
     * @param {UserDataFolderEntity} item
     */
    renderServiceList(item) {
        if (!item.hasChildren()) {
            return null;
        }
        return item.getUserDataServices().map(service => (
            <li key={service.getId()}>
                <Link to={`/accounts/edit/${item.getId()}/${service.getId()}`}>{this.getLink(service)}</Link>
                {this.getDesc(service)} <i>№{service.getIdentifier()}</i>
                <Link to={`/payments/${service.getService().getId()}?default[]=${service.getIdentifier()}`}>
                    ОПЛАТИТЬ
                </Link>
                [ <a href="#" onClick={this.delete(service.getId())}>Удалить</a> ]
            </li>
        ))
    }

    /**
     * @param {UserDataServiceEntity} service
     */
    getLink(service) {
        return service.getDescription() || service.getService().getName();
    }

    /**
     * @param {UserDataServiceEntity} service
     */
    getDesc(service) {
        return service.getDescription() ? service.getName() : service.getService().getParents().slice(-1).pop().getName();
    }

    render() {
        return <ul>
            {this.renderFoldersList()}
        </ul>
    }
}

export default connect(
    (s) => ({
        userData: mapToArr(s.accounts.get('userData'), UserDataFolderEntity)
    }),
    {deleteUserData}
)(UserDataList);
