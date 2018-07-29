import React from 'react'
import {mount} from 'enzyme'
import {Receipt} from "../src/Components/Pages/Reciept/Receipt"
import {historyOneElementList, historyTwoElementList} from './ResponseForTests/payHistoryResponse';
import {OrderedMap} from "immutable"


import configureMockStore from 'redux-mock-store'
import {payState} from "../src/Reducers/payHistory"
import {Provider} from "react-redux"
import ConnectedReceipt from "../src/Components/Pages/Reciept/Receipt"


describe('компонент <Reciept>', () => {

    /** Тест с immutable не проходит */
        // const initialState = {payHistory: payState};
        // const mockStore = configureMockStore()
        // let store, wrapper;
        // beforeEach(() => {
        //     store = mockStore(initialState);
        //     wrapper = mount(<Provider store={store}><ConnectedReceipt/></Provider>);
        // })
        // it('render ConnectedReceipt', () => {
        //     expect(wrapper.find(ConnectedReceipt).length).toEqual(1);
        // });


    let wrapper

    it('Коректность отображения данных одного чека', () => {

        wrapper = mount(<Receipt entities={historyOneElementList.result.list} mailSection={new OrderedMap({
            0: {success: false, errors: {}}
        })} mailSender={jest.fn()} sending={false}/>)

        expect(wrapper.length).toBe(1)

        const payResult = wrapper.find('.payment-result_item')

        expect(payResult.length).toEqual(9)

        expect(wrapper.find('button').length).toEqual(2)

    })

    it('Коректность отображения данных двух чеков', () => {

        wrapper = mount(<Receipt entities={historyTwoElementList.result.list} mailSection={new OrderedMap({
            0: {success: false, errors: {}}
        })} mailSender={jest.fn()} sending={false}/>)

        expect(wrapper.length).toBe(1)

        const payResult = wrapper.find('.payment-result_item')

        expect(payResult.length).toEqual(18)

        expect(wrapper.find('button').length).toEqual(2)

    })


})