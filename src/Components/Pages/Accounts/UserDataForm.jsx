import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import ServiceEntity from '../../../Reducers/Entities/ServiceEntity'

/**
 * @property {ServiceEntity} props.service
 */
class UserDataForm extends Component {
    static propTypes = {
        service: PropTypes.instanceOf(ServiceEntity),
        onSubmit: PropTypes.func,
        error: PropTypes.string,
        loading: PropTypes.bool,
        identifier: PropTypes.string,
        description: PropTypes.string
    }

    static defaultProps = {
        identifier: '',
        description: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            identifier: this.props.identifier,
            description: this.props.description
        }
    }

    onChange = ({target: {name, value}}) => {
        this.setState({[name]: value})
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.onSubmit(this.state.identifier, this.state.description)
    }

    render() {
        const service = this.props.service

        return (
            <form onSubmit={this.onSubmit}>форма добавления/редактирвоания:
                <fieldset>
                    <input name="identifier" value={this.state.identifier} onChange={this.onChange} placeholder={service.getIdentifierName()} />
                    <input name="description" value={this.state.description} onChange={this.onChange} placeholder="Сохранить как" />
                    <input type="submit" value="Сохранить"/>
                    {this.props.error ? <div>{this.props.error}</div> : null}
                </fieldset>
            </form>
        )
    }
}

export default connect(
    ({accounts}) => ({
        loading: accounts.get('searchLoading'),
        error: accounts.get('createUserDataError'),
    })
)(UserDataForm)
