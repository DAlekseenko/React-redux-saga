import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../../rootReducer';
import {routerMiddleware} from 'react-router-redux';
import {createBrowserHistory} from 'history';
import setQueryString from "../../Middlewares/setQueryString"
import setStateEntities from '../../Reducers/Entities/States'

export const history = createBrowserHistory();

export const getStore = (initialState, ...middlewares) => createStore(
    rootReducer,
    setStateEntities(initialState),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
            setQueryString(history),
            ...middlewares
        )
    )
);
