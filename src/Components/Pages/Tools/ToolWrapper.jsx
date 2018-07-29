import React, {PureComponent} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types"

export default class ToolWrapper extends PureComponent {

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        children: PropTypes.object.isRequired,
        successMsg: PropTypes.string,
        showBox: PropTypes.bool,
    }

    state = {
        successMsg: ''
    }

    componentWillReceiveProps(nextProps) {
        this.setState({successMsg: nextProps.successMsg})
        setTimeout(() => {
            this.state.successMsg && this.setState({successMsg: null})
        }, 5000)
    }

    componentWillUnmount() {
        this.state.successMsg = null
    }

    render = () => <div className="settings-item">
        <label className="settings-item_name -dotted" onClick={this.props.onClick}>
            {this.props.label}
        </label>
        {this.state.successMsg &&
        <span className='settings-item_successMsgs'>
                    {this.state.successMsg}
                    </span>}
        <ReactCSSTransitionGroup transitionName="settings-item_transition"
                                 transitionEnterTimeout={500}
                                 transitionLeaveTimeout={500}>
            {this.props.showBox && <div className="settings-item_content">
                {this.props.children}
            </div>}
        </ReactCSSTransitionGroup>
    </div>
}




