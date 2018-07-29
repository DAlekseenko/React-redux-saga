import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../../rootReducer'


export const getStore = (...middlewares) => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, ...middlewares))

    store.runSaga = sagaMiddleware.run

    return store
};
