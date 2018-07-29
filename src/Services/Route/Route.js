
export default class Route {

    data = null

    constructor(route) {
        this.data = route;
    }

    /**
     * @return {boolean}
     */
    isAuthNeeded() {
        return !!this.data.route.needAuth
    }

    getFetchFunctions() {
        return this.data.route.fetchData || [];
    }

    getFetchFunctionOnRouteChange() {
        return this.data.route.onRouteChangeFetch || null;
    }

    getFetchFunctionOnInit() {
        return this.data.route.onInitFetch || null;
    }

    getParams() {
        return this.data.match.params || {};
    }

    /**
     * @param {Function|Array} fetchData
     * @param {Array} closures
     * @return {*}
     */
    *executeFetchActions(fetchData, closures = []) {
        if (fetchData instanceof Function) {
            yield fetchData(closures.reduce((result, closure) => closure(result), this.getParams()))
        }
        if (fetchData instanceof Array) {
            for (let fetchFunction of fetchData) {
                if (fetchFunction instanceof Function) {
                    yield fetchFunction(closures.reduce((result, closure) => closure(result), this.getParams()))
                }
            }
        }
    }

    executeFetchData(closures = []) {
        return this.executeFetchActions(this.getFetchFunctions(), closures)
    }

    executeOnRouteChangeFetchData(closures = []) {
        return this.executeFetchActions(this.getFetchFunctionOnRouteChange(), closures)
    }
}

//{route: {
//  path: '/categories/:id(\\d+)',
//  exact: true,
//  component: [Object],
//  title: 'Категории',
//  fetchData: [Function: fetchCategories]
// },
// match: {
//  path: '/categories/:id(\\d+)',
//  url: '/categories/1',
//  isExact: true,
//  params: [Object]
// }
//}