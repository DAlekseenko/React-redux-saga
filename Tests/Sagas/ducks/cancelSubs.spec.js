import {put} from 'redux-saga/effects'
import {cancelSubscriptionFail,cancelSubscriptionSuccess ,cancelSubsHandler} from '../../../src/Reducers/Ducks/tools/cancelSubs'

describe('cancelSubs Saga', () => {

    it('should process logic on total logout handler whit true value', () => {

        const action = {payload: {value: 1}};

        const sagaProcess = cancelSubsHandler(action)

        // spawn event for put cancelSubscriptionSuccess
        expect(sagaProcess.next().value).toEqual(put(cancelSubscriptionSuccess()))

        //done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })

    it('should process logic on total logout handler whit false value', () => {

        const action = {payload: {value: ""}};

        const sagaProcess = cancelSubsHandler(action)

        // spawn event for put logout
        expect(sagaProcess.next().value).toEqual(put(cancelSubscriptionFail()))

        //done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })
})