import {FAVORITE_DISTRIBUTOR} from '../CONSTANTS'

export default store => next => action => {
    switch (action.type) {
        case FAVORITE_DISTRIBUTOR:
            if (action.payload.value) {
                action.successAC && next(action.successAC())
            } else {
                action.failAC && next(action.failAC())
            }
            break
    }
    return next(action)
}