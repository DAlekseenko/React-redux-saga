import React from 'react';
import {connect} from 'react-redux'

import {Search} from '../Partials'
import { categoriesSetSearch } from '../../../Reducers/AC/categoriesAC'
import * as c from '../../../Reducers/Ducks/categories/categories'

const CategoriesSearch = (props) => <Search {...props} />

export default connect(
    (state) => ({
        loading:                c.loadingSelector(state),
        searchValue:            c.searchQuerySelector(state),
        searchIn:               c.parentIdSelector(state),
        autoCompleteLoading:    c.autoCompleteLoadingSelector(state),
        autoCompleteWorks:      c.autoCompleteWorksSelector(state),
        autoCompleteServices:   c.autoCompleteServicesSelector(state),
        autoCompleteCategories: c.autoCompleteCategoriesSelector(state),
        count_services:         c.servicesCountSelector(state),
        count_categories:       c.categoriesCountSelector(state),
    }),
    {
        setSearch:         categoriesSetSearch,
        autoCompleteFunc:  c.autoCompleteSearch,
        resetAutoComplete: c.resetAutoComplete
    }
)(CategoriesSearch)