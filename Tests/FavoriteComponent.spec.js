import React from 'react';
import {shallow} from 'enzyme';
import {Favorite} from "../src/Components/Pages/Favorites/Favorite";
import {FavoritesRecord} from "../src/Reducers/entities"
import FormGroup from "../src/Components/Pages/Partials/FormGroup"


describe('>>>FAVORITE COMPONENT', () => {
    let wrapper;
    const name = 'Назвние избранной категории';

    const favorite = new FavoritesRecord({name, service_id: 1})

    beforeEach(() => {
        wrapper = shallow(<Favorite favorite={favorite}/>)
    })

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('+++ render the FormGroup component', () => {
        expect(wrapper.find(FormGroup).length).toEqual(1);
    });

    it('+++ contains output', () => {
        expect(wrapper.find(FormGroup).prop('value')).toEqual(name)
    });

});