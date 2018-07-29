import { call, put, select, apply } from 'redux-saga/effects'
import { fetch, encodeMessage } from '../../src/Reducers/Sagas/requestSaga'
import ParamsContainer from '../../src/Services/Api/ClientApiParamsContainer'
import ApiCaller from '../../src/Services/Api/ApiCaller'
import { hashSelector, setObserved } from '../../src/Reducers/Ducks/common'

describe('fetch Saga', () => {
    const beforeAC = () => ({})
    const successAC = (r) => (r)
    const serverErrorAC = () => ('serverError')
    const forbiddenErrorAC = () => ('forbiddenError')
    const badRequestAC = () => ('badRequest')
    const fieldErrorAC = () => ('fieldError')
    const dataLoadErrorAC = () => ('dataLoadError')
    const method = 'locations'
    const location_id = 1

    const paramsContainer = new ParamsContainer('http://foo', {})
    const apiCaller = new ApiCaller(method, {location_id}, paramsContainer)
    const message = apiCaller.getMessage()

    it('should call api successfully + test beforeAC', () => {

        const observedAs = undefined
        const sagaProcess = fetch(paramsContainer, {method, observedAs, beforeAC, successAC})

        // spawn event for get hash
        expect( sagaProcess.next().value ).toEqual( select(hashSelector, observedAs) )

        // spawn event for get api message
        expect( sagaProcess.next().value ).toEqual( apply(apiCaller, apiCaller.getMessage) )

        // spawn event for call message encode
        expect( sagaProcess.next(message).value ).toEqual( call(encodeMessage, message) )

        // spawn event for call beforeAC
        expect( sagaProcess.next( encodeMessage(message) ).value ).toEqual( put(beforeAC(paramsContainer)) )

        // spawn event for call fetch data
        expect( sagaProcess.next().value ).toEqual( apply(apiCaller, apiCaller.call) )

        // spawn event for put result
        expect( sagaProcess.next( {data:{result: [1, 2]}} ).value ).toEqual( put(successAC([1, 2])) )

        // done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })

    it('should not call api with same message', () => {
        const observedAs = 'NAME'
        const sagaProcess = fetch(paramsContainer, {method, observedAs, successAC})

        // spawn event for get hash
        expect( sagaProcess.next().value ).toEqual( select(hashSelector, observedAs) )

        // spawn event for get api message
        expect( sagaProcess.next( encodeMessage(message) ).value ).toEqual( apply(apiCaller, apiCaller.getMessage) )

        // spawn event for call message encode
        expect( sagaProcess.next(message).value ).toEqual( call(encodeMessage, message) )

        // done saga process
        expect(sagaProcess.next( encodeMessage(message) ).done).toBeTruthy()
    })

    it('should call api with same message and hotReload key', () => {
        const observedAs = 'NAME'
        const hotReload = true
        const sagaProcess = fetch(paramsContainer, {method, observedAs, hotReload, successAC})

        // spawn event for get hash
        expect( sagaProcess.next().value ).toEqual( select(hashSelector, observedAs) )

        // spawn event for get api message
        expect( sagaProcess.next( encodeMessage(message) ).value ).toEqual( apply(apiCaller, apiCaller.getMessage) )

        // spawn event for call message encode
        expect( sagaProcess.next(message).value ).toEqual( call(encodeMessage, message) )

        // spawn event for call fetch data
        expect( sagaProcess.next( encodeMessage(message) ).value ).toEqual( apply(apiCaller, apiCaller.call) )

        // spawn event for put result
        expect( sagaProcess.next( {data:{result: [1, 2]}} ).value ).toEqual( put(successAC([1, 2])) )

        // spawn event for save message
        expect( sagaProcess.next().value ).toEqual( put(setObserved(observedAs, encodeMessage(message))) )

        // done saga process
        expect(sagaProcess.next( encodeMessage(message) ).done).toBeTruthy()
    })

    it('should throw dataLoadErrorAC', () => {
        const observedAs = undefined
        const sagaProcess = fetch(paramsContainer, {method, observedAs, dataLoadErrorAC})
        const xhr = {}

        sagaProcess.next()
        // throw exception
        expect( sagaProcess.throw(xhr).value ).toEqual( put(dataLoadErrorAC(xhr)) )

        // done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })

    it('should throw serverError', () => {
        const observedAs = undefined
        const sagaProcess = fetch(paramsContainer, {method, observedAs, serverErrorAC})
        const xhr = {response: {status: 500, data: []}}

        sagaProcess.next()
        // throw exception
        expect( sagaProcess.throw(xhr).value ).toEqual( put(serverErrorAC(xhr)) )

        // done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })

    it('should throw forbiddenError', () => {
        const observedAs = undefined
        const sagaProcess = fetch(paramsContainer, {method, observedAs, forbiddenErrorAC})
        const xhr = {response: {status: 403, data: []}}

        sagaProcess.next()
        // throw exception
        expect( sagaProcess.throw(xhr).value ).toEqual( put(forbiddenErrorAC(xhr)) )

        // done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })

    it('should throw badRequest', () => {
        const observedAs = undefined
        const sagaProcess = fetch(paramsContainer, {method, observedAs, badRequestAC})
        const xhr = {response: {status: 400, data: []}}

        sagaProcess.next()
        // throw exception
        expect( sagaProcess.throw(xhr).value ).toEqual( put(badRequestAC(xhr)) )

        // done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })

    it('should throw fieldError', () => {
        const observedAs = undefined
        const sagaProcess = fetch(paramsContainer, {method, observedAs, fieldErrorAC})
        const xhr = {response: {status: 499, data: []}}

        sagaProcess.next()
        // throw exception
        expect( sagaProcess.throw(xhr).value ).toEqual( put(fieldErrorAC(xhr)) )

        // done saga process
        expect(sagaProcess.next().done).toBeTruthy()
    })
})
