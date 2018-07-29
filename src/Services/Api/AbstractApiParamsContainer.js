
export default class AbstractApiParamsContainer {

    store = null;

    ips = [];

    token = null;

    locationId = null;

    url = null;

    constructor(url) {
        this.url = url;
    }

    hasStore() {
        return !!this.store;
    }

    hasIP() {
        return !!this.ips.length;
    }

    setStore(store) {
        this.store = store;
        return this;
    }

    getUser() {
        if (!this.store) {
            throw new Error('store was not be defined');
        }
        return this.store.getState().auth.get('user') || null;
    }

    getStoredLocationId() {
        return this.store.getState().locations.get('locationId')
    }

    getLocationId() {
        return this.locationId;
    }

    getIP() {
        return this.ips.join(' ');
    }

    getUrl() {
        return this.url;
    }
}