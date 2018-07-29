import React from 'react'
import {mount} from 'enzyme'
import SendReceiptToMail from "../src/Components/Pages/History/SendReceiptToMail"

import {OrderedMap} from "immutable"
import PropTypes from "prop-types"



describe('компонент <SendReceiptToMail>', () => {


    let wrapper , value

    const onChange = jest.fn((e)=> {  value = e.target.value })

    beforeEach(() => {
        wrapper = mount(<SendReceiptToMail receiptKey="16aadfe8-4825-42b8-bc3c-7f79af1b1959-10000156521" sender={jest.fn()} sending={false}/>)
    })

    it('Коректность отображения ', () => {

        expect(wrapper.length).toBe(1)
        expect(wrapper.find('button').length).toEqual(1)
        expect(wrapper.find('button').text()).toEqual('Отправить')
        expect(wrapper.find('input').length).toEqual(1)

    })

})