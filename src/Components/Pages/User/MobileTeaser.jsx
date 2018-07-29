import React, {Component} from 'react';
import {connect} from "react-redux"
import {IOS, ANDROID} from "../../../CONSTANTS"
import {setClosedTeaser} from "../../../Reducers/AC/authAC"

export class MobileTeaser extends Component {

    state = {
        platform: null
    };

    componentWillMount() {
        if (this.props.device === IOS) {
            this.setState({platform: 'App Store'})
        }

        if (this.props.device === ANDROID) {
            this.setState({platform: 'Google Play'})
        }
    }

    _closed = () => {
        this.props.setClosedTeaser(this.state.platform)
        this.setState({platform: null})
    }

    render = () =>
        <div className='teaser-app' style={{display: !this.state.platform && 'none'}}>
            МТС Деньги все платежи без комиссии Бесплатно в {this.state.platform}{' '}
            <button onClick={this._closed}>Закрыть</button>
        </div>
}

export default connect(({auth}) => ({device: auth.get('device')}), {setClosedTeaser})(MobileTeaser)