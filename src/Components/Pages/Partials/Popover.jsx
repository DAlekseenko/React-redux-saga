import SimplePopover from 'react-awesome-popover';
import "react-awesome-popover/dest/react-awesome-popover.css";
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Popover extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        children: PropTypes.array.isRequired
    }

    render() {
        return (
            <SimplePopover open={this.props.open} onClose={this.props.onClose} arrow={false} action={null}>
                {this.props.children}
            </SimplePopover>
        )
    }
}