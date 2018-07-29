import { take, apply, put } from 'redux-saga/effects'
import { prepareParamsToRout } from "pbr-lib-front-utils/dist/queryStringHelper"

import { CHANGE_ROUTE } from  '../../CONSTANTS'
/**
 *
 * @param {RouteManager} routeManager
 * @param window
 */
export default function* routeWatcher(routeManager, window) {
   while (true) {
       const {payload: {pathname, search}} = yield take(CHANGE_ROUTE);
       const route = yield apply(routeManager, routeManager.findFirst, [pathname + search])
       for (let action of route.executeOnRouteChangeFetchData([prepareParamsToRout]) ) {
           yield put(action);
       }
       yield apply(window, window.scrollTo, [0, 0])
   }
}
