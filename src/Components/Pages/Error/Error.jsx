import React , {Component} from 'react';
import PageLayout from '../../Decorators/PageLayout';

class Error extends Component {

    constructor(props) {
        super(props);
        props.staticContext && props.staticContext.setNotFound && props.staticContext.setNotFound();
    }

    render() {
        return (
            <div>
                Ошибка 404!
            </div>
        );
    }
}

export default PageLayout(Error);
