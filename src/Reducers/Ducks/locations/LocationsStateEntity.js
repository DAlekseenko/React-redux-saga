import { Record, OrderedMap } from 'immutable'
import { arrToMap, mapToArr } from 'pbr-lib-front-utils/dateManipulation'
import RegionEntity from '../../Entities/RegionEntity'
import CityEntity from '../../Entities/CityEntity'

const defaultFields = {
    regions: OrderedMap(),
    cities: OrderedMap(),
    loading: false,
    locationId: null
}

export default class LocationsStateEntity extends Record(defaultFields) {

    _regions = undefined

    _cities = undefined

    /**
     *
     * @return {LocationsStateEntity}
     */
    loadingOn() {
        return this.set('loading', true)
    }

    /**
     *
     * @return {LocationsStateEntity}
     */
    loadingOff() {
        return this.set('loading', false)
    }

    /**
     * @param {string|integer} id
     * @return {LocationsStateEntity}
     */
    setLocationId(id = null) {
        return this.set('locationId', id)
    }

    /**
     *
     * @param {[]} regions
     * @param {[]} cities
     * @return {LocationsStateEntity}
     */
    setLocations(regions = [], cities = []) {
        this._regions = this._cities = undefined;

        return this
            .set('regions', arrToMap(regions, false))
            .set('cities', arrToMap(cities, false))
    }

    /**
     *
     * @return {Array<RegionEntity>}
     */
    getRegions() {
        if (this._regions === undefined) {
            this._regions = mapToArr(this.regions, RegionEntity) || []
        }
        return this._regions
    }

    /**
     *
     * @return {Array<CityEntity>}
     */
    getCities() {
        if (this._cities === undefined) {
            this._cities = mapToArr(this.cities, CityEntity) || []
        }
        return this._cities
    }
}
