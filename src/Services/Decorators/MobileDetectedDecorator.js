import MobileDetect from 'mobile-detect'
import is from 'is_js'
import {ANDROID, IOS} from "../../CONSTANTS"

export default class MobileDetectedDecorator {

    userAgent;

    removeTeaser;

    mobileDetected;

    constructor(req) {
        if (req.headers && is.existy(req.headers['user-agent'])) {
            this.userAgent = req.headers['user-agent']
        }

        if (req.cookies && req.cookies['removeTeaser']) {
            this.removeTeaser = req.cookies['removeTeaser']
        }

        if (this.userAgent) {
            this.mobileDetected = new MobileDetect(this.userAgent);
        }
    }

    getOs() {
        const os = this.getMobileOs()
        if (os && !this.removeTeaser) {
            return os
        }
        return null
    }

    getMobileOs() {
        if (this.mobileDetected) {
            if (this.mobileDetected.mobile() && [IOS, ANDROID].includes(this.mobileDetected.os())) {
                return this.mobileDetected.os()
            }
        }
        return null
    }
}