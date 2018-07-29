import categories from './../../Ducks/categories/CategoriesStateEntity'
import {moduleName as categoriesModule} from './../../Ducks/categories/categories';
import locations from './../../Ducks/locations/LocationsStateEntity'
import {moduleName as locationModule} from './../../Ducks/locations/locations';
import help from './../../Ducks/help/HelpStateEntity'
import {moduleName as helpModule} from './../../Ducks/help/help';
import passwordChange from './../../Ducks/tools/PasswordChangeStateEntity'
import {moduleName as passwordChangeModule} from './../../Ducks/tools/passwordChange';
import editProfile from './../../Ducks/tools/EditProfileStateEntity'
import {moduleName as editProfileModule} from './../../Ducks/tools/editProfile';
import totalLogout from './../../Ducks/tools/TotalLogoutStateEntity'
import {moduleName as totalLogoutModule} from './../../Ducks/tools/totalLogout';
import cancelSubs from './../../Ducks/tools/CancelSubsStateEntity'
import {moduleName as cancelSubsModule} from './../../Ducks/tools/cancelSubs';

const stateEntities = {
    [categoriesModule]: categories,
    [locationModule]: locations,
    [helpModule]: help,
    [passwordChangeModule]: passwordChange,
    [editProfileModule]: editProfile,
    [totalLogoutModule]: totalLogout,
    [cancelSubsModule]: cancelSubs
}

export default function setStateEntities(initialState) {
    for (let stateName in initialState) {
        if (stateEntities[stateName]) {
            initialState[stateName] = new stateEntities[stateName](initialState[stateName])
        }
    }
    return initialState;
}
