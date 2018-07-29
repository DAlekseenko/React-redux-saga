import MobileDetectedDecorator from '../Services/Decorators/MobileDetectedDecorator';

export default function defineIncomeSys(req, res, next) {
    req.mobileDetect = new MobileDetectedDecorator(req)
    next()
}