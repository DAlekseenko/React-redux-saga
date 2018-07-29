
import {search} from './commonAC'

export const categoriesSetSearch = data => dispatch => {
    dispatch(search(data));
}
