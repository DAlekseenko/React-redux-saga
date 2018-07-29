import {
    START, SUCCESS, RESET,
    SET_CATEGORIES,
    SET_AUTO_COMPLETE, ERROR, FAIL
} from "../CONSTANTS"
import CategoriesStateEntity from './Ducks/categories/CategoriesStateEntity'

export default (state = new CategoriesStateEntity(), action = {}) => {
    switch (action.type) {
        case SET_AUTO_COMPLETE + START:
            return state
                .set('autoCompleteLoading', true)
                .set('autoCompleteWorks', true)
        case SET_AUTO_COMPLETE + SUCCESS:
            return state
                .set('autoCompleteLoading', false)
                .set('autoCompleteDetected', [
                    {
                        title: 'Категории',
                        suggestions: action.payload.categories,
                    },
                    {
                        title: 'Сервисы',
                        suggestions: action.payload.services,
                    }])
        case SET_AUTO_COMPLETE + RESET:
            return state
                .set('autoCompleteDetected', [])
                .set('searchValue', action.searchQuery)
        case SET_CATEGORIES + FAIL:
            return state
                .set('loading', false)
        default:
            return state;
    }
}