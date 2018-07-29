import React, {Component} from 'react';
import {AutoComplete} from '../Partials'
import {Roller} from '../../Loading'
import PropTypes from 'prop-types';


export default class Search extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        searchValue: PropTypes.string,
        count_categories: PropTypes.number,
        count_services: PropTypes.number,
        resetAutoComplete: PropTypes.func.isRequired,
        autoCompleteWorks: PropTypes.bool.isRequired,
        searchIn: PropTypes.any
    }

    state = {
        searchQuery: '',
        hint: ''
    }

    _onChange = ({target: {name, value}}, aCEvent) => {
        if (aCEvent && ['up', 'down'].includes(aCEvent.method)) {
            value = aCEvent.newValue;
        }
        name && this.setState({[name]: value});
        if (name === 'searchQuery' && value.length < 3) {
            this.props.resetAutoComplete(value)
        }
    }

    componentWillMount() {
        this._setState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this._setState(nextProps)
    }

    _setState = (props) => {
        this.setState(() => {
            const {count_categories, count_services, autoCompleteWorks, searchValue} = props;
            const newState = {}
            if (!autoCompleteWorks) {
                newState['searchQuery'] = searchValue;
            }
            newState['hint'] = '';
            if (count_categories > -1 && (count_categories || count_services)) {
                newState['hint'] = `Найдено категорий: ${count_categories}, услуг: ${count_services}`

            }
            return newState;
        })
    }

    _onSubmit = (e, searchQuery) => {
        e.preventDefault();
        if (this._validateSearchString()) {
            this.setState({hint: ''})
            this.props.setSearch({'searchQuery': searchQuery || this.state.searchQuery});
        }
    }

    _validateSearchString = () => {
        if (this.state.searchQuery.trim().length < 3) {
            this.setState({hint: 'Введите более 2х символов'})
            return false
        }
        return true;
    }

    render = () => {
        const {props: {loading}, state: {searchQuery, hint}} = this;
        return (
            <section className="search">
                <form className="search-form" onSubmit={this._onSubmit}>
                    <AutoComplete name="searchQuery"
                                  placeholder="Поиск предприятий и услуг"
                                  value={searchQuery}
                                  onChange={this._onChange}
                                  onSubmit={this._onSubmit}
                                  multiSection={true}
                                  {...this.props}/>
                    <div className="search-form_loader-wrap">
                        {loading && <Roller width="38px"/>}
                    </div>
                    <div className="search-form_button-wrap">
                        <button className="search-form_button-wrap_button">Найти</button>
                    </div>
                </form>
                {hint && <span className='search-form_hint'>{hint}</span>}
            </section>
        );
    }
}

