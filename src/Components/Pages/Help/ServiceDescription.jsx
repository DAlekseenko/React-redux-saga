import {connect} from "react-redux"

import Document from './Document';
import PageLayout from "../../Decorators/PageLayout"
import {description, loading} from "../../../Reducers/Ducks/help/help"

export default connect(
    state => ({
        document: description(state),
        loading: loading(state),
    })
)(PageLayout(Document))