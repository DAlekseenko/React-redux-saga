import React, {Component} from 'react';
import PropTypes from "prop-types"

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        checked: PropTypes.number,
        disabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    }

    render = ()  => <input type={'checkbox'} {...this.props}/>

}
