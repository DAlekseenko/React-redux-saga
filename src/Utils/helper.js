import is from 'is_js';
import {OrderedMap} from "immutable"

/**
 * удаляет префикс для eRip
 * @param phone string
 * @param prefix string
 */
export function prepareOriginFieldPhone(phone, prefix) {
    return phone.substr(prefix.length).replace(new RegExp('[^0-9]', 'g'), '')
}


/**
 * Вынести в  библиотеку
 * Удаляет пустые символы из строки
 * @param str
 * @return {string}
 */
export function trim(str) {
    if (typeof str === 'string') {
        return str.replace(/\s*/g, '');
    }
    throw  TypeError('Value is not a string');
}

/**
 * Строит карту с полями пользователя, для пополнения с карты
 * @param fieldsObject
 * @param Map {Map}
 * @return {Map}
 */
export function fieldsRechargeConverter(Map = OrderedMap({}), fieldsObject = {}) {

    if (OrderedMap.isOrderedMap(Map) && is.object(fieldsObject)) {
        for (let name in fieldsObject) {
            if(Map.has(name)) {
                Map = Map.set(name, {name, ...fieldsObject[name]})
            }
        }
    }
    return Map;
}



