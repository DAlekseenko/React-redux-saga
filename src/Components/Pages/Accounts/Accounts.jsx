import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import PageComponent from '../../App/PageComponent'
import {mapToArr, arrToMap} from "pbr-lib-front-utils/dateManipulation";
import PageLayout from "../../Decorators/PageLayout";
import Slider from './Slider'
import UserDataList from './UserDataList'
import UserDataForm from './UserDataForm'
import Search from './Search'
import Invoices from './Invoices'

import {ACCOUNTS_SLIDER_LOADED, ACCOUNTS_USER_DATA_LOADED, ACCOUNTS_INVOICES_LOADED} from "../../../CONSTANTS";
import { editUserData } from '../../../Reducers/AC/accountsAC'
import UserDataServiceEntity from '../../../Reducers/Entities/UserDataServiceEntity'

/**
 * @property {UserDataServiceEntity} props.editUserDataService
 */
class Accounts extends PageComponent {
    static propTypes = {
        sliderLoaded: PropTypes.bool,
        userDataLoaded: PropTypes.bool,
        invoicesLoaded: PropTypes.bool,
        parentId: PropTypes.string,
        search: PropTypes.string,
        pageLoaded: PropTypes.func,
        location: PropTypes.object,
        editUserDataService: PropTypes.instanceOf(UserDataServiceEntity)
    }

    editUserData = id => (identifier, description) => {
        this.props.editUserData(id, identifier, description)
    }

    renderPopup() {
        if (!this.props.parentId) {
            return null
        }

        return <div className="fixed-popup">
            <Link to='/accounts'>Закрыть</Link>
            <Search parentId={this.props.parentId} search={this.props.search} location={this.props.location}/>
        </div>
    }

    renderEditPopup() {
        const userDataService = this.props.editUserDataService;
        if (!userDataService) {
            return null
        }

        return <div className="fixed-popup">
            <Link to='/accounts'>Закрыть</Link>
            редактирование сервиса
            <UserDataForm
                service={userDataService.getService()}
                identifier={userDataService.getIdentifier()}
                description={userDataService.getDescription()}
                onSubmit={this.editUserData(userDataService.getId())}
            />
        </div>
    }

    render() {
        return <div>
            <div>{this.props.invoicesLoaded && <Invoices />}</div>
            <div>Мои счета</div>
            <div key='slider'>{this.isBrowser() && this.props.sliderLoaded ? <Slider/> : null }</div>
            <div key ='userData'>{this.props.userDataLoaded ? <UserDataList/> : null }</div>
            <Link to='/accounts/0/'>Добавить</Link>
            {this.renderPopup()}
            {this.renderEditPopup()}
        </div>
    }
}

export default connect(
    ({accounts}, {location, match:{params:{div_id, user_data_id, parent_id, search}}}) => {

        let editUserDataService = arrToMap( accounts.getIn(['userData', parseInt(div_id), 'services']) ).get(parseInt(user_data_id))
        editUserDataService = editUserDataService && new UserDataServiceEntity(editUserDataService);

        return {
            editUserDataService,
            location,
            search,
            parentId: parent_id,
            sliderLoaded: !!(accounts.get('allDivLoaded') & ACCOUNTS_SLIDER_LOADED),
            userDataLoaded: !!(accounts.get('allDivLoaded') & ACCOUNTS_USER_DATA_LOADED),
            invoicesLoaded: !!(accounts.get('allDivLoaded') & ACCOUNTS_INVOICES_LOADED),
    }},
    { editUserData }
)(PageLayout(Accounts));