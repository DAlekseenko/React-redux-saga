import React, {Component} from 'react';


export default class RightAside extends Component {
    render = () =>
        <aside className="right-aside">
            {this.props.children}
        </aside>
}
