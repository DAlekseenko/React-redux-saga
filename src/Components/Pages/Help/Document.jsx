import React from 'react';
import PropTypes from 'prop-types'
import Parser from 'html-react-parser';

import DocumentEntity from '../../../Reducers/Entities/DocumentEntity';
import PageComponent from '../../App/PageComponent';
import {Roller} from '../../Loading';

export default class Document extends PageComponent {

    static propTypes = {
        document: PropTypes.instanceOf(DocumentEntity).isRequired,
        loading: PropTypes.bool.isRequired
    }

    render = () =>
        <article>
            {this.props.loading && <Roller width="100px"/>}
            <h3>{Parser(this.props.document.getTitle())}</h3>
            <div>{Parser(this.props.document.getText())}</div>
        </article>
}