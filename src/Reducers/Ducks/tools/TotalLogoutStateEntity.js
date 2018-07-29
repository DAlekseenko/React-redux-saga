import {Record} from 'immutable'

export const defaultFields = {
    totalLogoutLoading: false,
    totalLogoutLFail: false
}

export default class TotalLogoutStateEntity extends Record(defaultFields) {

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    totalLogoutLoadingOn() {
        return this.set('totalLogoutLoading', true).set('totalLogoutLFail', false);
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    totalLogoutLoadingOff() {
        return this.set('totalLogoutLoading', false);
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    setTotalLogoutFail() {
        return this.set('totalLogoutLFail', true);
    }

    /**
     * @return {boolean}
     */
    getTotalLogoutLoading() {
        return this.totalLogoutLoading;
    }

    /**
     * @return {boolean}
     */
    getTotalLogoutFail() {
        return this.totalLogoutLFail;
    }
}