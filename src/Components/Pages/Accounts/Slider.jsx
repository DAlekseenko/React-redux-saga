import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {mapToArr} from "pbr-lib-front-utils/dateManipulation";
import {connect} from "react-redux";
import ReactSlider from 'react-slick'
import SlideItem from './SlideItem'
import BannerEntity from '../../../Reducers/Entities/BannerEntity'
import {createUserDataUsingBanner, resetCreateUserDataUsingBanner} from '../../../Reducers/AC/accountsAC'


const HOVER = 0b00001   // стопим на наведение мышки на слайдер
const FOCUS = 0b00010   // стопим на фокус по полю на слайдере
const INSERT = 0b00100  // стопим, когда ввели какие-то данные

class Slider extends Component {
    static propTypes = {
        slider: PropTypes.array.isRequired,
        createUserDataUsingBanner: PropTypes.func,
        loading: PropTypes.any,
        error: PropTypes.object,
        success: PropTypes.object,
        sliderLoaded: PropTypes.bool
    }
    state = {
        stopSlide: 0b00000,
    }

    timeout = null;

    constructor(props) {
        super(props)
        this.props.slider.forEach(item => {
            this.state[item.getServiceId()] = ''
        })
    }

    onMouseOver = (e) => {
        this.timeout && clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.toggleSliding(this.state.stopSlide | HOVER)
        }, 200);
    }

    onMouseOut = (e) => {
        this.timeout && clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.toggleSliding(this.state.stopSlide ^ HOVER)
        }, 200);
    }

    onFocus = (e) => {
        this.toggleSliding(this.state.stopSlide | FOCUS)
    }

    onBlur = (e) => {
        this.toggleSliding(this.state.stopSlide ^ FOCUS)
    }

    onChange = ({target: {name, value}}) => {
        this.setState({[name]: value})
        if (value === '') {
            this.toggleSliding(this.state.stopSlide ^ INSERT)
        } else {
            this.toggleSliding(this.state.stopSlide | INSERT)
        }
    }

    onSubmit = serviceId => e => {
        e.preventDefault()
        const value = this.state[serviceId]
        if (value !== '') {
            this.props.createUserDataUsingBanner(serviceId, value)
        }
    }

    onAfterSlide = () => {
        this.refreshState()
        this.resetData()
    }

    onBeforeSlide = () => {}

    refreshState() {
        let state = {stopSlide: 0b00000};
        this.props.slider.forEach(item => {
            state[item.getServiceId()] = ''
        })
        this.setState(state)
    }

    resetData() {
       if (this.props.error || this.props.success) {
           this.props.resetCreateUserDataUsingBanner()
       }
    }

    toggleSliding(stopSlide) {
        if (!!stopSlide) {
            this.slider.slickPause()
        } else {
            this.slider.slickPlay()
        }
        this.setState({stopSlide})
    }

    renderList() {
        return this.props.slider.map(item => (
            <div key={item.getServiceId()}>
                <SlideItem
                    item={item}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit( item.getServiceId() )}
                    disabled={!!this.props.loading}
                    error={this.props.error}
                    success={this.props.success}
                    values={this.state}
                />
            </div>
        ));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success && !this.props.success) {
            setTimeout(() => {
                if (this.props.success) {
                    this.refreshState()
                    this.props.resetCreateUserDataUsingBanner()
                }
            }, 3000)
        }
    }

    render() {
        const setting = {
            dots: false,
            infinite: true,
            autoplay: !this.state.stopSlide && !this.props.loading, // при загрузке и принудительном стопе отключаем слайдинг
            draggable: !this.props.loading, // при загрузке отключаем переключение мышкой,
            arrows: !this.props.loading,
            speed: 500,
            afterChange: this.onAfterSlide,
            beforeChange: this.onBeforeSlide,
            pauseOnHover: false // кривая реализация: можно вызвать слайдер стоп, потом вызвать hoverOut и он запустится
        }

        return <div className="slider-wrapper" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            <ReactSlider ref={slider => this.slider = slider} {...setting} >
                {this.renderList()}
            </ReactSlider>
        </div>
    }
}

export default connect(
    (s => ({
        slider: mapToArr(s.accounts.get('slider'), BannerEntity),
        loading: s.accounts.get('loadingDataForSlider'),
        error: s.accounts.get('error'),
        success: s.accounts.get('success'),
    })),
    {
        createUserDataUsingBanner, resetCreateUserDataUsingBanner
    }
)(Slider);