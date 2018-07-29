import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BannerEntity from '../../../Reducers/Entities/BannerEntity'

/**
 * @property {BannerEntity} props.item
 */
export default class SliderItem extends Component {
    static propTypes = {
        item: PropTypes.instanceOf(BannerEntity),
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        disabled: PropTypes.bool,
        error: PropTypes.object,
        success: PropTypes.object,
        values: PropTypes.object
    }

    render() {
        const {item, onFocus, onBlur, onChange, onSubmit, disabled, error, success, values} = this.props

        return (
            <form className='slider-item_wrap' onSubmit={onSubmit}>
                <img style={{width:'100%'}} src={item.getBannerImg()} draggable={false} />
                <fieldset className='slider-item_content' style={{top: `${item.getOffsetY()}px`, left: `${item.getOffsetX()}px`}} disabled={disabled}>
                    <div>{item.getTextTitle()}</div>
                    <div>{item.getDescription()}</div>
                    <input name={item.getServiceId()} value={values[item.getServiceId()]} placeholder={item.getPlaceholder()} onFocus={onFocus} onBlur={onBlur} onChange={onChange} tabIndex="-1"/>
                    <input type="submit" value="Узнать начисления" tabIndex="-1"/>
                    <div>{error && (error.service_id === item.getServiceId()) && error.text}</div>
                    <div>{success && (success.service_id === item.getServiceId()) && success.text}</div>
                </fieldset>
            </form>
        )
    }
}
