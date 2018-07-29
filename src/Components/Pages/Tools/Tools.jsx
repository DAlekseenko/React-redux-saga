import React from 'react';
import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import {
    ChangePassword,
    EditProfile,
    ToolWrapper,
    BankingAgreement,
    UserAgreement,
    TotalLogout,
    DeleteSubscription
} from './index';


class Tools extends PageComponent {

    state = {
        showBox: [],
        successMsgs: []
    }

    _onClick = blockNumber => ({target}) => {
        let {showBox} = this.state;
        showBox[blockNumber] = !showBox[blockNumber]
        this.setState({showBox, successMsgs: []})
    }

    blockManagement = (blockNumber, successMsg = null) => {
        let {showBox, successMsgs} = this.state;
        showBox[blockNumber] = false
        if (successMsg) {
            successMsgs[blockNumber] = successMsg
        }
        this.setState({showBox, successMsgs})
    }

    render = () =>
        <div className="settings">
            <ToolWrapper successMsg={this.state.successMsgs[1]}
                         showBox={this.state.showBox[1]} onClick={this._onClick(1)} label='Сменить пароль'>
                <ChangePassword blockManagement={this.blockManagement} block={1}/>
            </ToolWrapper>
            <ToolWrapper successMsg={this.state.successMsgs[2]}
                         showBox={this.state.showBox[2]} onClick={this._onClick(2)} label='Сменить ФИО'>
                <EditProfile blockManagement={this.blockManagement} block={2}/>
            </ToolWrapper>
            <ToolWrapper showBox={this.state.showBox[3]} onClick={this._onClick(3)} label='Банковское соглашение'>
                <BankingAgreement/>
            </ToolWrapper>
            <ToolWrapper showBox={this.state.showBox[4]} onClick={this._onClick(4)} label='Правила системы'>
                <UserAgreement/>
            </ToolWrapper>
            <ToolWrapper showBox={this.state.showBox[5]} onClick={this._onClick(5)} label='Выйти на всех устройствах'>
                <TotalLogout/>
            </ToolWrapper>
            <ToolWrapper showBox={this.state.showBox[6]} onClick={this._onClick(6)} label='Отменить подписку'>
                <DeleteSubscription/>
            </ToolWrapper>
        </div>
}

export default (PageLayout(Tools))

