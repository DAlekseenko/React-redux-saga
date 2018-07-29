import AbstractApiParamsContainer from './AbstractApiParamsContainer'
import {LOCATION_ID, TOKEN} from "../../CONSTANTS";

export default class ClientApiParamsContainer extends AbstractApiParamsContainer {

    cookieManager = null;

    constructor(url, cookie) {
        super(url);
        this.cookieManager = cookie;
    }

    getLocationId() {
        return this.getStoredLocationId() || this.cookieManager.get(LOCATION_ID)
    }

    getToken() {
        return this.cookieManager.get(TOKEN)
    }

}
