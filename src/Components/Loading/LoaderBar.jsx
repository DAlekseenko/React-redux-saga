import React, {Component} from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';


export default class LoaderBar extends Component {
    static propTypes = {
        hidden: PropTypes.bool
    };

    render() {
        let className = classNames({'admin-grid-loader-bar': true, '-hidden': this.props.hidden});
        return (
            <div className={className}/>
        );
    }
}
