import React from 'react'
import DatePicker from '../src/Components/Pages/Partials/SimpleDatePicker'
import {mount} from 'enzyme'
import moment from "moment/moment"


describe('DatePicker Component', () => {

    let picker

    const onChange = jest.fn()

    const data = {'DDMMYY': '111111', 'MMYY': '0200'}

    for (let format in data) {

        it('check input value' + format, () => {

            picker = mount(<DatePicker value={moment(data[format], format)}
                                       name='test'
                                       format={format}
                                       onChange={onChange}/>)

            expect(picker.length).toEqual(1)

            expect(picker.find('input').prop('value')).toEqual(data[format])
        })
    }
})