import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Autosuggest from 'react-autosuggest'
import CategoryEntity from "../../../Reducers/Entities/CategoryEntity";
import ServiceEntity from "../../../Reducers/Entities/ServiceEntity";

/**
 * @property {Array<ServiceEntity>} props.autoCompleteServices
 * @property {Array<CategoryEntity>} props.autoCompleteCategories
 */
export default class AutoComplete extends React.Component {

    /** @var number таймаут для запроса */
    timeout;
    /** @var string строка запроса */
    searchValue;

    static propTypes = {
        /** Input */
        name: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        loading: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        inputModifier: PropTypes.string,
        /** AutoComplete */
        multiSection: PropTypes.bool,
        autoCompleteLoading: PropTypes.bool,
        autoCompleteServices: PropTypes.arrayOf(PropTypes.instanceOf(ServiceEntity)),
        autoCompleteCategories: PropTypes.arrayOf(PropTypes.instanceOf(CategoryEntity)),
        autoCompleteFunc: PropTypes.func,
        searchIn: PropTypes.any
    };

    _getInputProps = () => {

        const {
            name, placeholder, type = 'text',
            loading, inputModifier, onChange,
            value
        } = this.props;

        const inputClass = {
            'search-form_input': !inputModifier,
        };
        inputClass[inputModifier] = !!inputModifier;

        return {
            className: classNames(inputClass),
            name,
            type,
            placeholder,
            disabled: loading,
            onChange,
            value
        };
    }

    componentWillReceiveProps(nextProps) {
        nextProps.loading && clearTimeout(this.timeout)
    }

    _getValue = suggestion => suggestion && suggestion.name

    _getSection = section => section.suggestions

    _minCountValue = val => val.length > 2

    _clearResult = () => {
    }

    renderSectionTitle = section => !!section.suggestions.length && <strong>{section.title}</strong>

    /**
     *
     * @param  {CategoryEntity|ServiceEntity} item
     * @returns {*}
     * @private
     */
    _renderBlock = (item) =>
        <div key={item.getId()}>
            <Link to={`/${(item instanceof ServiceEntity) ? 'payments' : 'categories'}/${item.getId()}`}>{item.getName()}</Link>
        </div>

    _fetchRequested = ({value, reason}) => {
        this.searchValue = value.trim();
        const {props: {searchIn, autoCompleteFunc}, searchValue} = this;
        clearTimeout(this.timeout);
        if (this._minCountValue(value) && reason === 'input-changed' && searchValue !== this.props.value.trim()) {
            this.timeout = setTimeout(() => {
                autoCompleteFunc(searchValue, searchIn)
            }, 1000)
        }
    }

    _selected = (event, {suggestionValue}) => {
        !event.target.href && this.props.onSubmit(event, suggestionValue)
    }

    _getSuggestions = () => {
        const suggestions = []
        const { autoCompleteCategories, autoCompleteServices } = this.props
        if (autoCompleteCategories.length) {
            suggestions.push({
                title: 'Категории',
                suggestions: autoCompleteCategories,
            })
        }
        if (autoCompleteServices.length) {
            suggestions.push({
                title: 'Сервисы',
                suggestions: autoCompleteServices,
            })
        }
        return suggestions
    }

    render = () =>
        <Autosuggest multiSection={this.props.multiSection}
            renderSectionTitle={this.renderSectionTitle}
            getSectionSuggestions={this._getSection}
            suggestions={this._getSuggestions()}
            onSuggestionsFetchRequested={this._fetchRequested}
            onSuggestionsClearRequested={this._clearResult}
            getSuggestionValue={this._getValue}
            renderSuggestion={this._renderBlock}
            shouldRenderSuggestions={this._minCountValue}
            onSuggestionSelected={this._selected}
            inputProps={this._getInputProps()}
        />
}
