import React, {Component} from 'react';
import DatePicker from 'react-datetime'
import PropTypes from 'prop-types';

export default class SimpleDatePicker extends Component {

    static propTypes = {
        value: PropTypes.object,
        name: PropTypes.string.isRequired,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        format: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    onChange = date => {
        this.props.onChange({target: {name: this.props.name, value: date.format(this.props.format)}})
    }

    render = () =>
        <DatePicker inputProps={{disabled: this.props.disabled, readOnly: true}}
                    onChange={this.onChange}
                    dateFormat={this.props.format}
                    timeFormat={false}
                    locale="ru-ru"
                    viewMode={this.props.format.length === 4 ? 'months' : 'days'}
                    value={this.props.value}/>

}


