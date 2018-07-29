import {UPDATE_FAVORITE, ADD_FAVORITE, DELETE_FAVORITE, SUCCESS} from '../CONSTANTS'
import {getFavorites} from "../Reducers/AC/favoritesAC"
import {pushLocation, withHotReload} from "../Reducers/AC/commonAC"


export default store => next => action => {
    switch (action.type) {
        case UPDATE_FAVORITE + SUCCESS:
            store.dispatch(pushLocation('/favorites'))
        case DELETE_FAVORITE + SUCCESS:
        case ADD_FAVORITE + SUCCESS:
            store.dispatch(withHotReload(getFavorites()))
            break
    }

    return next(action)
}