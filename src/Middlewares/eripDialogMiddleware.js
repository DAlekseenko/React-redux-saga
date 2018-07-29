import {DIALOG_DISTRIBUTOR} from '../CONSTANTS'
import {rechargeDialog} from "../Reducers/AC/payIvoicesAC"

export default history => ({dispatch}) => next => action => {
    switch (action.type) {
        case DIALOG_DISTRIBUTOR:
            if (action.payload.status === 'fail' && action.failAC) {
                next(action.failAC(action.payload))
                break
            }
            if (action.payload.advanced && action.overAC) {
                next(action.overAC())
                if (action.payload.advanced.direct_pay === false) {
                    dispatch(rechargeDialog(action.payload))
                    history.push(`/recharge-dialog`)
                } else {
                    history.push(`/history-items/${action.payload.uuid}`)
                }
                break
            }
            if (action.successAC) {
                next(action.successAC(action.payload))
                break
            }
    }
    return next(action)
}
