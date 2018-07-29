import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
//import {getLocation} from '../src/Reducers/Requests/locationRequest' /** @todo отрефакторить */
import * as types from '../src/CONSTANTS'
import moxios from 'moxios';
import expect from 'expect'
import {CLIENT_POST_URL} from "../src/CONSTANTS"
import MtsMoneyRequest from "../src/Utils/RequestApi/MtsMoneyRequest"
import ErrorHandler from "../src/Utils/ErrorHandler"
import {getHistoryItem} from "../src/Reducers/Requests/payHistoryRequest"
import {mailSender} from "../src/Reducers/Requests/mailSenderRequest"

const mockStore = configureMockStore([thunk])

MtsMoneyRequest.setUrl(CLIENT_POST_URL)


describe('locationAC', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });


    it('Получение локаций', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {result: {res: 'locationObject'}}
            });
        })

        const expectedActions = [
            {type: types.SET_LOCATION + types.START, locationId: {locationId: 167}},
            {type: types.SET_LOCATION + types.SUCCESS, payload: {res: 'locationObject'}}
        ]

        const store = mockStore({})

        return store.dispatch(getLocation({locationId: 167})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Ошибка при получение локаций', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response: {msg: 'Ошибка сервера'}
            })
        })
        const expectedActions = [
            {type: types.SET_LOCATION + types.START, locationId: {locationId: 167}},
            {payload: {msg: 'Ошибка сервера'}, type: types.ERROR}
        ]

        const store = mockStore({})

        ErrorHandler.setDispatcher(store.dispatch)

        return store.dispatch(getLocation({locationId: 167})).then((err) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

describe('payHistoryAC', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('получить квитанции', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {result: {res: 'historyObject'}}
            });
        })

        const expectedActions = [
            {type: types.SET_HISTORY_ITEMS + types.START},
            {type: types.SET_HISTORY_ITEMS + types.SUCCESS, payload: {res: 'historyObject'}}
        ]

        const store = mockStore({})

        return store.dispatch(getHistoryItem({transaction_uuids: 'dklfhghskjdkaodisa'})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Ошибка при получение истории', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()

            request.respondWith({
                status: 500,
                response: {msg: 'Ошибка сервера'}
            })
        })
        const expectedActions = [
            {type: types.SET_HISTORY_ITEMS + types.START},
            {type: types.ERROR, payload: {msg: 'Ошибка сервера'}}
        ]

        const store = mockStore({})

        ErrorHandler.setDispatcher(store.dispatch)

        return store.dispatch(getHistoryItem({transaction_uuids: 'dklfhghskjdkaodisa'})).then((err) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})


describe('mailSender', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    const store = mockStore({})

    ErrorHandler.setDispatcher(store.dispatch)

    it('Отправка почты', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {result: {res: {value: 1}}}
            });
        })

        const expectedActions = [
            {type: types.SEND_MAIL + types.START, sectionID: 1},
            {type: types.SEND_MAIL + types.SUCCESS, payload: {res: {value: 1}}}
        ]

        const store = mockStore({})

        return store.dispatch(mailSender({}, 1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Ошибка при отправке почты', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()

            request.respondWith({
                status: 500,
                response: {msg: 'Ошибка сервера'}
            })
        })
        const expectedActions = [
            {type: types.SEND_MAIL + types.START, sectionID: 0},
            {type: types.ERROR, payload: {msg: 'Ошибка сервера'}}
        ]

        const store = mockStore({})

        ErrorHandler.setDispatcher(store.dispatch)

        return store.dispatch(mailSender({})).then((err) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Ошибка при отправке полей', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()

            request.respondWith({
                status: 499,
                response: {
                    name: "Fields Error",
                    result: {email: "Необходимо заполнить «e-mail»."},
                    message: "Необходимо заполнить «e-mail»."
                }
            })
        })
        const expectedActions = [
            {type: types.SEND_MAIL + types.START, sectionID: 5},
            {
                type: types.SEND_MAIL + types.FAIL,
                payload: {fields: {email: "Необходимо заполнить «e-mail»."}, msg: "Необходимо заполнить «e-mail»."},
            }
        ]

        const store = mockStore({})

        ErrorHandler.setDispatcher(store.dispatch)

        return store.dispatch(mailSender({}, 5)).then((err) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


})