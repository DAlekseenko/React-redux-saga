import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SimpleDatePicker from "../Partials/SimpleDatePicker"
import moment from "moment"


export default class HistoryForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        date_from: PropTypes.string.isRequired,
        date_to: PropTypes.string.isRequired
    }

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div>
                    Период с
                    <SimpleDatePicker format="DD.MM.YYYY" onChange={this.props.onChange} name="date_from"
                                      value={moment(this.props.date_from, "DD.MM.YYYY")}/>
                    по
                    <SimpleDatePicker format="DD.MM.YYYY" onChange={this.props.onChange} name="date_to"
                                      value={moment(this.props.date_to, "DD.MM.YYYY")}/>
                    <button><span>Показать</span></button>
                </div>
            </form>
        );
    }
}

