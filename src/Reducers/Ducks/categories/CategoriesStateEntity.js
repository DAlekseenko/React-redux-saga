import { Record, OrderedMap } from 'immutable'
import { arrToMap, mapToArr } from 'pbr-lib-front-utils/dateManipulation'
import ServiceEntity from '../../Entities/ServiceEntity'
import CategoryEntity from '../../Entities/CategoryEntity'

const defaultFields = {
    count_categories: null,
    count_services: null,
    entities: OrderedMap(),
    targetCategoryPath: OrderedMap(),
    searchValue: '',
    loading: false,
    autoCompleteDetected: [],
    autoCompleteCategories: OrderedMap(),
    autoCompleteServices: OrderedMap(),
    autoCompleteLoading: false,
    autoCompleteWorks: false,
}

export default class CategoriesStateEntity extends Record(defaultFields) {

    _categories = undefined;

    _services = undefined;

    _autoCompleteCategories = undefined;

    _autoCompleteServices = undefined;

    _path = undefined;

    /**
     *
     * @return {CategoriesStateEntity}
     */
    loadingOn() {
        return this.set('loading', true)
    }

    /**
     *
     * @return {CategoriesStateEntity}
     */
    loadingOff() {
        return this.set('loading', false)
    }

    /**
     * @returns {boolean}
     */
    isLoading() {
        return this.get('loading')
    }

    /**
     *
     * @return {CategoriesStateEntity}
     */
    clearAutocomplete() {
        return this
            .set('autoCompleteDetected', [])
            .set('autoCompleteWorks', false)
            .set('count_categories', null)
            .set('count_services', null)
    }

    /**
     *
     * @returns {boolean}
     */
    isAutoCompleteWork() {
        return this.get('autoCompleteWorks')
    }

    /**
     *
     * @returns {CategoriesStateEntity}
     */
    autoCompleteLoadingOn() {
        return this.set('autoCompleteLoading', true)
    }

    /**
     *
     * @returns {CategoriesStateEntity}
     */
    autoCompleteLoadingOff() {
        return this.set('autoCompleteLoading', false)
    }

    /**
     * @returns {boolean}
     */
    isAutoCompleteLoading() {
        return this.get('autoCompleteLoading')
    }

    /**
     * @param value
     * @return {CategoriesStateEntity}
     */
    setSearchValue(value = '') {
        return this.set('searchValue', value)
    }

    /**
     *
     * @param  categoriesCount
     * @param  servicesCount
     * @return {CategoriesStateEntity}
     */
    setCounters(categoriesCount, servicesCount) {
        return this.set('count_categories', categoriesCount).set('count_services', servicesCount)
    }

    getCategoriesCount() {
        return this.get('count_categories')
    }

    getServicesCount() {
        return this.get('count_services')
    }

    /**
     *
     * @param  {[]} data
     * @return {CategoriesStateEntity}
     */
    setEntities(data) {
        this._categories = this._services = undefined;

        return this.set('entities', arrToMap(data, false))
    }

    setAutoCompleteEntities(categories = [], services = []) {
        this._autoCompleteCategories = this._autoCompleteServices = undefined;

        return this
            .set('autoCompleteCategories', arrToMap(categories, false))
            .set('autoCompleteServices', arrToMap(services, false))
    }

    /**
     * @return {Array<CategoryEntity>}
     */
    getAutoCompleteCategories() {
        if (this._autoCompleteCategories === undefined) {
            this._autoCompleteCategories = mapToArr(this.autoCompleteCategories, CategoryEntity) || []
        }
        return this._autoCompleteCategories
    }

    /**
     * @return {Array<ServiceEntity>}
     */
    getAutoCompleteServices() {
        if (this._autoCompleteServices === undefined) {
            this._autoCompleteServices = mapToArr(this.autoCompleteServices, ServiceEntity) || []
        }
        return this._autoCompleteServices
    }

    /**
     *
     * @param  {[]} data
     * @return {CategoriesStateEntity}
     */
    setPath(data) {
        this._path = undefined;

        return this.set('targetCategoryPath', arrToMap(data, false))
    }

    /**
     *
     * @return {Array<CategoryEntity>}
     */
    getCategoriesPath() {
        if (this._path === undefined) {
            this._path = mapToArr(this.targetCategoryPath, CategoryEntity) || []
        }
        return this._path
    }

    /**
     * Возвращает ближайшего родителя, если есть.
     *
     * @return {CategoryEntity|null}
     */
    getParent() {
        let categories = this.getCategoriesPath()
        if (categories.length === 0) {
            return null
        }
        return categories.slice(-1)[0]
    }

    /**
     *
     * @return {null|string}
     */
    getParentId() {
        let parent = this.getParent()

        return parent && parent.getId()
    }

    /**
     *
     * @returns {string}
     */
    getSearchQuery() {
        return this.get('searchValue')
    }

    /**
     *
     * @return {Array<CategoryEntity>}
     */
    getCategories() {
        if (this._categories === undefined) {
            this._categories = mapToArr(
                this.entities.filter(({is_category}) => is_category),
                CategoryEntity
            ) || []
        }
        return this._categories
    }

    /**
     *
     * @return {Array<ServiceEntity>}
     */
    getServices() {
        if (this._services === undefined) {
            this._services = mapToArr(
                this.entities.filter(({is_category}) => !is_category),
                ServiceEntity
            ) || []
        }
        return this._services
    }
}
