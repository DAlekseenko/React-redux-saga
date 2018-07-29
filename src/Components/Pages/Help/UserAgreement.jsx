import {connect} from "react-redux"

import Document from './Document';
import PageLayout from "../../Decorators/PageLayout"
import {agreement ,loading} from "../../../Reducers/Ducks/help/help"

const UserAgreementConnect = connect(
    state => ({
        document: agreement(state),
        loading: loading(state),
    })
)(Document)

export default UserAgreementConnect

export const UserAgreementLayout = PageLayout(UserAgreementConnect);