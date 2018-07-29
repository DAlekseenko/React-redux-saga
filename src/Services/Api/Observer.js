
export default class Observer {

    key = null

    store = null

    hotReload = false

    message = null

    constructor(store, key = null, hotReload = false) {
        this.store = store
        this.key = key
        this.hotReload = !!hotReload
    }

    isNeedLoad(message) {
        if (this.key === null) {
            return true;
        }
        this.encodeMessage(message);

        return this.hotReload || this.message !== this.getStoredMessage()
    }

    saveCurrentConstrains(ac) {
        if (this.key === null) {
            return true;
        }
        this.store.dispatch(ac(this.key, this.message))
    }

    encodeMessage(message) {
        this.message = JSON.stringify(message);
    }

    getStoredMessage() {
        return this.store.getState().common.get('observed').get(this.key)
    }
}
