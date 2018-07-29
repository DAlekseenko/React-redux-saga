import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from '../Login';
import {UserUnit} from '../User';
import {Link} from "react-router-dom"


class LeftAside extends Component {

    render = () =>
        <aside className="left-aside">
            {!this.props.user ?
                <div>
                    <Login/>
                    <hr className="mts-hr"/>
                    <h5>
                        Нажимая кнопку «Войти», вы подтверждаете, что ознакомлены и согласны с
                        <Link to="/help/user-agreement"> Правилами системы</Link>
                    </h5>
                </div> :
                <UserUnit user={this.props.user}/>}
        </aside>

}

export default connect(
    (s => ({
        user: s.auth.get('user'),
    }))
)(LeftAside)
