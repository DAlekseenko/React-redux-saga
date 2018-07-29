import { put } from 'redux-saga/effects'
import {updateUserInfoSaga} from '../../../src/Reducers/Ducks/tools/editProfile'
import { getUserByToken } from "../../../src/Reducers/Ducks/auth/auth";

describe('editProfile Saga', () => {

    it('should process logic on update user profile', () => {

        const sagaProcess = updateUserInfoSaga()

        // spawn event for put user by token
        expect( sagaProcess.next().value ).toEqual( put( getUserByToken() ) )

        //done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })
})