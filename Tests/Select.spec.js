import React from 'react'
import {Select} from '../src/Components/Pages/Partials/Select'
import {shallow,mount} from 'enzyme'


describe('Select Component', () => {

    let selector

    let selected = 'World';

    const onChange = jest.fn((e)=> { selected = e.target.value })

    function getChildren() {
        return [{value: 1, text: 'Hello'}, {value: 2, text: 'World'}, {value: 3, text: 'Simple'}].map((e, i) => {
            return <option key={i} value={e.value}>{e.text}</option>
        })
    }

    selector = shallow(<Select name='test' selected={selected} children={getChildren()} onChange={onChange}/>)

    it('render the Select component', () => {
        expect(selector.length).toEqual(1)
    });

    it('selected', () => {
        expect(selector.find(`option[value=2]`).text()).toEqual('World')
    });

    test('selector changes the text after change', () => {

        expect(selector.prop('value')).toEqual('World')

        selector.simulate('change', {target: {value: 'Hello'}})
        expect(selected).toEqual('Hello')

        selector.simulate('change', {target: {value: 'Simple'}})
        expect(selected).toEqual('Simple')

    })

})