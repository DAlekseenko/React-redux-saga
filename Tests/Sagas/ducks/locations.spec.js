import { put, apply, select } from 'redux-saga/effects'
import {changeLocationSaga, setUserLocation} from '../../../src/Reducers/Ducks/locations/locations'
import { LOCATION_ID } from "../../../src/CONSTANTS";
import { userSelector } from "../../../src/Reducers/Ducks/auth/auth";
import { parentIdSelector, searchQuerySelector, fetchCategories } from "../../../src/Reducers/Ducks/categories/categories";

describe('locations Saga', () => {
    const cookieManager = {
        set: (key, value, options) => ({key, value, options})
    }

    it('should process logic on changeLocation ', () => {

        const sagaProcess = changeLocationSaga(cookieManager, { payload: 100 })
        const user = {id: 1, name: 'somebody'}
        const id = 100500
        const searchQuery = 'МТС'

        // spawn event for call cookie set
        expect( sagaProcess.next().value ).toEqual( apply(cookieManager, cookieManager.set, [LOCATION_ID, 100, { expires: 9999 }]) )

        // spawn event for select user
        expect( sagaProcess.next().value ).toEqual( select( userSelector ) )

        // spawn event for put user location
        expect( sagaProcess.next(user).value ).toEqual( put( setUserLocation() ) )

        // spawn event for select parentId of parent category
        expect( sagaProcess.next().value ).toEqual( select( parentIdSelector ) )

        // spawn event for select parentId of parent category
        expect( sagaProcess.next(id).value ).toEqual( select( searchQuerySelector ) )

        // spawn event for fetch categories
        expect( sagaProcess.next(searchQuery).value ).toEqual( put( fetchCategories({id, searchQuery}) ) )

        //done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })
})