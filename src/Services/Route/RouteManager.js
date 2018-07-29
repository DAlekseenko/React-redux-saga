import {renderRoutes, matchRoutes} from 'react-router-config'
import Route from './Route'

export default class RouteManager {

    routes = []

    constructor(routes) {
        for (let route of routes) {
            if (route.path instanceof Array) {
                for (let path of route.path) {
                    let newRoute = Object.assign({}, route)
                    newRoute.path = path
                    this.routes.push(newRoute)
                }
                continue;
            }
            this.routes.push(route)
        }
    }

    renderRoutes() {
        return renderRoutes(this.routes)
    }

    /**
     *
     * @param  {string} url
     * @return {Route|boolean}
     */
    findFirst(url) {
        const branch = matchRoutes(this.routes, url)
        if (branch[0]) {
            return new Route(branch[0]);
        }
        return false;
    }
}
