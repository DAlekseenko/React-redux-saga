import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux';

import authReducer, {moduleName as authModule} from './Reducers/Ducks/auth/auth'
import commonReducer, {moduleName as commonModule} from './Reducers/Ducks/common'
import categoriesReducer, {moduleName as categoriesModule} from './Reducers/Ducks/categories/categories'
import eripDialog from './Reducers/eripDialog'
import locationsReducer, {moduleName as locationModule} from './Reducers/Ducks/locations/locations'
import payHistory from './Reducers/payHistory'
import mailSender from './Reducers/mailSender'
import accounts from './Reducers/accounts'
import assist from './Reducers/assist'
import favorites from './Reducers/favorites'
import payInvoices from './Reducers/payInvoices'
import editProfile, {moduleName  as editProfileModule} from './Reducers/Ducks/tools/editProfile'
import passwordChange, {moduleName  as passwordChangeModule} from './Reducers/Ducks/tools/passwordChange'
import totalLogout, {moduleName  as totalLogoutModule} from './Reducers/Ducks/tools/totalLogout'
import cancelSubs, {moduleName  as cancelSubsModule} from './Reducers/Ducks/tools/cancelSubs'
import help, {moduleName as helpModule} from './Reducers/Ducks/help/help'


export default combineReducers({
    [authModule]: authReducer,
    [categoriesModule]: categoriesReducer,
    eripDialog,
    [locationModule]: locationsReducer,
    payHistory,
    mailSender,
    [passwordChangeModule]: passwordChange,
    [editProfileModule]: editProfile,
    [totalLogoutModule]: totalLogout,
    [cancelSubsModule]: cancelSubs,
    [helpModule]: help,
    favorites,
    accounts,
    assist,
    payInvoices,
    [commonModule]: commonReducer,
    router
});