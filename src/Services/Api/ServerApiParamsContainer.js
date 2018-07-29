import AbstractApiParamsContainer from './AbstractApiParamsContainer'
import {LOCATION_ID, REAL_IP, TOKEN} from "../../CONSTANTS";
import is from 'is_js'

export default class ServerApiParamsContainer extends AbstractApiParamsContainer {

    /**
     * @param url
     * @param request Реквест от Экспресс сервера
     */
    constructor(url, request) {
        super(url);
        const {cookies} = request;

        this.ips = ServerApiParamsContainer.getIpFromRequest(request);
        this.token = cookies[TOKEN];
        this.locationId = cookies[LOCATION_ID];
    }

    getLocationId() {
        const user = this.getUser();
        if (user && user.location_id) {
            return user.location_id;
        }
        return this.locationId;
    }

    getToken() {
        return this.token;
    }


    /** @todo вынести в либу */
    static getIpFromRequest(request) {
        const {headers} = request;
        let ips = [];
        let headerIp = is.ip(headers[REAL_IP]) || '';
        let clientIp = ServerApiParamsContainer.findRemoteIP(request).split(':').slice(-1)[0];

        !is.ip(clientIp) && (clientIp = '127.0.0.1');

        headerIp && ips.push(headerIp);
        clientIp && ips.push(clientIp);

        return ips;
    }

    /** @todo вынести в либу */
    static findRemoteIP(req) {
        if (is.existy(req.connection)) {
            if (is.ip(req.connection.remoteAddress)) {
                return req.connection.remoteAddress;
            }
            if (is.existy(req.connection.socket) && is.ip(req.connection.socket.remoteAddress)) {
                return req.connection.socket.remoteAddress;
            }
        }

        if (is.existy(req.socket) && is.ip(req.socket.remoteAddress)) {
            return req.socket.remoteAddress;
        }
        return '';
    }
}
