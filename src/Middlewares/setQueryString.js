import { stateToQueryString } from 'pbr-lib-front-utils/dist/queryStringHelper'
import { SEARCH_EVENT } from '../CONSTANTS'
import { pushLocation } from '../Reducers/AC/commonAC'


export default history => store => next => action => {
    if (action.type === SEARCH_EVENT) {
        store.dispatch(pushLocation(
            `${location.pathname}?${stateToQueryString(action.payload)}`
        ))
    }
    return next(action)
}
