import {TOKEN, SUCCESS, LOGIN_USER, LOGOUT_CURRENT_USER, CLOSED_TEASER} from '../CONSTANTS'
import { changeLocation } from "../Reducers/AC/locationAC"
import { pushLocation } from "../Reducers/AC/commonAC"
/** @todo Сделать сагу и удалить это)
 *  @deprecated
 * */
export default (history, CookieManager) => store => next => action => {
    switch (action.type) {
        // case LOGIN_USER + SUCCESS :
        //     // if (action.payload.authKey) {
        //     //     CookieManager.set(TOKEN, action.payload.authKey, {expires: 1})
        //     // }
        //     // if(action.payload.user){
        //     //     store.dispatch(changeLocation(action.payload.user.location_id))
        //     // }
        //     break
        // case LOGOUT_CURRENT_USER:
        //     CookieManager.remove(TOKEN)
        //     store.dispatch(pushLocation('/'))
        //     break
        case CLOSED_TEASER:
            CookieManager.set('removeTeaser', action.payload, {expires: 1})
            break
    }

    return next(action)
}