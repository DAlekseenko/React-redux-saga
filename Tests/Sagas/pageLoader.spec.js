import { put, select, apply, take } from 'redux-saga/effects'
import { END } from 'redux-saga'
import { prepareParamsToRout } from "pbr-lib-front-utils/dist/queryStringHelper"

import pageLoader from '../../src/Reducers/Sagas/pageLoader'
import Route from '../../src/Services/Route/Route'
import { getUserByToken, userSelector, setDevice, GET_USER_FAIL, GET_USER_SUCCESS, LOGOUT } from '../../src/Reducers/Ducks/auth/auth'
import { getLocations } from '../../src/Reducers/Ducks/locations/locations'
import { fetchCategories } from '../../src/Reducers/Ducks/categories/categories'

describe('pageLoader Saga', () => {
    const req = {mobileDetect: {getOs: () => 'test'}}
    const res = {redirect: () => {}}

    it('should process unautorizing route', () => {
        const route = new Route({
            route: {
                path: '/categories/:id(\\d+)',
                exact: true,
                component: {},
                title: 'Категории',
                fetchData: [fetchCategories]
            },
            match: {
                path: '/categories/:id(\\d+)',
                url: '/categories/1',
                isExact: true,
                params: {id: '1'}
            }
        })

        const sagaProcess = pageLoader(req, res, route)

        // spawn get user event
        expect( sagaProcess.next().value ).toEqual( put(getUserByToken()) )

        // spawn take event on get user result
        expect( sagaProcess.next().value ).toEqual( take([GET_USER_SUCCESS, GET_USER_FAIL, LOGOUT]) )

        // spawn user selector
        expect( sagaProcess.next().value ).toEqual( select(userSelector) )

        // spawn event for getDeviceName
        expect( sagaProcess.next(null).value ).toEqual( apply( req.mobileDetect, req.mobileDetect.getOs ) )

        // spawn event for setDevice
        expect( sagaProcess.next( req.mobileDetect.getOs() ).value ).toEqual( put(setDevice( req.mobileDetect.getOs() )) )

        // spawn event for getLocations
        expect( sagaProcess.next().value ).toEqual( put(getLocations()) )

        // spawn events for fetchData
        for (let action of route.executeFetchData([prepareParamsToRout])) {
            expect( sagaProcess.next().value ).toEqual( put(action) )
        }
        // spawn event for END saga
        expect( sagaProcess.next().value ).toEqual( put(END) )

        //done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })

    it('should process redirect for autorizing route', () => {
        const route = new Route({
            route: {
                path: '/categories/:id(\\d+)',
                exact: true,
                needAuth: true,
                component: {},
                title: 'Категории',
                fetchData: [fetchCategories]
            },
            match: {
                path: '/categories/:id(\\d+)',
                url: '/categories/1',
                isExact: true,
                params: {id: '1'}
            }
        })

        const sagaProcess = pageLoader(req, res, route)

        // spawn get user event
        expect( sagaProcess.next().value ).toEqual( put(getUserByToken()) )

        // spawn take event on get user result
        expect( sagaProcess.next().value ).toEqual( take([GET_USER_SUCCESS, GET_USER_FAIL, LOGOUT]) )

        // spawn user selector
        expect( sagaProcess.next().value ).toEqual( select(userSelector) )

        // spawn event for getDeviceName
        expect( sagaProcess.next(null).value ).toEqual( apply( req.mobileDetect, req.mobileDetect.getOs ) )

        // spawn event for redirect
        expect( sagaProcess.next(req.mobileDetect.getOs()).value ).toEqual( apply( res, res.redirect, ['/'] ) )
    })
})