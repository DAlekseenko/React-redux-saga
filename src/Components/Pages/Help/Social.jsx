import {connect} from "react-redux"

import Document from './Document'
import PageLayout from "../../Decorators/PageLayout"
import {social, loading} from "../../../Reducers/Ducks/help/help"

export default connect(
    state => ({
        document: social(state),
        loading: loading(state),
    })
)(PageLayout(Document))