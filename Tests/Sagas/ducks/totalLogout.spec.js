import {put} from 'redux-saga/effects'
import {totalLogoutFail, totalLogoutHandler ,totalLogoutSuccess} from '../../../src/Reducers/Ducks/tools/totalLogout'
import {logout} from "../../../src/Reducers/Ducks/auth/auth";

describe('totalLogout Saga', () => {

    it('should process logic on total logout handler whit true value', () => {

        const action = {payload: {value: 1}};

        const sagaProcess = totalLogoutHandler(action)

        // spawn event for put totalLogoutSuccess
        expect(sagaProcess.next().value).toEqual(put(totalLogoutSuccess()))

        // spawn event for put logout
        expect(sagaProcess.next().value).toEqual(put(logout()))

        //done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })

    it('should process logic on total logout handler whit false value', () => {

        const action = {payload: {value: ""}};

        const sagaProcess = totalLogoutHandler(action)

        // spawn event for put logout
        expect(sagaProcess.next().value).toEqual(put(totalLogoutFail()))

        //done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })
})