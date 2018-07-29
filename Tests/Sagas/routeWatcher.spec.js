import { put, apply, take } from 'redux-saga/effects'
import { prepareParamsToRout } from "pbr-lib-front-utils/dist/queryStringHelper"
import routeWatcher from '../../src/Reducers/Sagas/routeWatcherSaga'
import RouteManager from '../../src/Services/Route/RouteManager'
import { fetchCategories } from "../../src/Reducers/Ducks/categories/categories"
import { CHANGE_ROUTE } from '../../src/CONSTANTS'

describe('routeWatcher Saga', () => {
    const routes = [
        {
            path: ['/', '/\?(.+)'],
            exact: true,
            component: null,
            title: 'Главная страница',
            onRouteChangeFetch: fetchCategories,
            fetchData: null
        }
    ]
    const routeManager = new RouteManager(routes)
    const window = {scrollTo: (a, b) => ({a, b})}
    const pathname = '/'
    const search = '?searchQuery=%D0%BC%D1%82%D1%81'

    it('should process logic on route change action', () => {
        const sagaProcess = routeWatcher(routeManager, window)

        // spawn take event:
        expect( sagaProcess.next().value).toEqual( take(CHANGE_ROUTE) )

        // takes event and spawn event for find route
        expect( sagaProcess.next( {payload: {pathname, search}}).value).toEqual(
            apply(routeManager, routeManager.findFirst, [pathname + search])
        )

        const route = routeManager.findFirst(pathname + search)

        // spawn events for fetchData
        for (let action of route.executeOnRouteChangeFetchData([prepareParamsToRout])) {
            expect( sagaProcess.next(route).value ).toEqual( put(action) )
        }

        // spawn event for call scrollTo
        expect( sagaProcess.next().value ).toEqual( apply(window, window.scrollTo, [0, 0]) )

        // spawn next iteration of saga
        expect( sagaProcess.next().value ).toEqual( take(CHANGE_ROUTE) )
    })
})
