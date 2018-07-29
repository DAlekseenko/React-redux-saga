import {Record} from 'immutable'

export const defaultFields = {

    cancelSubs: false,
    cancelSubsFail: false,
    subsCanceled: false,
}

export default class CancelSubsStateEntity extends Record(defaultFields) {

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    cancelSubsOn() {
        return this
            .set('cancelSubs', true)
            .set('subsCanceled', false)
            .set('cancelSubsFail', false);
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    cancelSubsOff() {
        return this.set('cancelSubs', false);
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    setSubsCanceled() {
        return this.set('subsCanceled', true);
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    setCancelSubsFail() {
        return this.set('cancelSubsFail', true);
    }

    /**
     * @return {boolean}
     */
    cancelSubsLoading() {
        return this.cancelSubs;
    }

    /**
     * @return {boolean}
     */
    getCancelSubsFail() {
        return this.cancelSubsFail;
    }

    /**
     * @return {boolean}
     */
    getSubsCanceled() {
        return this.subsCanceled;
    }
}