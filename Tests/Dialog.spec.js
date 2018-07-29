import React from 'react'
import {mount} from 'enzyme'
import {Dialog} from "../src/Components/Pages/Dialog/Dialog"
import {List, Map} from "immutable"
import {DialogFieldsRecord} from "../src/Reducers/entities"
import {arrToMap} from "pbr-lib-front-utils/dateManipulation"

describe('Тестирование Диалога', () => {

    let dialog

    beforeEach(() => {
        dialog = mount(<Dialog entities={List([])}/>)
    })

    it('Текстовый input', () => {

        const dialogResponce = {
            fields: [{
                "description": "Лицевой счет",
                "name": "Лицевой счет",
                "type": "S",
                "maxLength": 12,
                "minLength": 12,
                "min": null,
                "max": null,
                "hint": null,
                "format": null,
                "value": null,
                "originalField": true,
                "isSum": null,
                "nominal": null,
                "editable": true,
                "placeholder": null,
                "mask": null,
                "required": true
            }]
        }

        const dialogBlocks = List([
            Map({
                fields: arrToMap(dialogResponce.fields, DialogFieldsRecord, item => item.name)
            })])

        dialog.setProps({entities: dialogBlocks})

        expect(dialog.length).toBe(1)

        const equals = {
            name: 'Лицевой счет',
            type: 'text',
            value: '',
            placeholder: null,
            required: true,
            disabled: false,
            className: 'form-group_control'
        };

        for (let propName in equals) {
            expect(dialog.find('input').prop(propName)).toEqual(equals[propName])
        }
    })

    it('Дата input', () => {

        const dialogResponce = {
            fields: [{
                "description": "Период",
                "name": "Период",
                "type": "D",
                "maxLength": 4,
                "minLength": 4,
                "min": null,
                "max": null,
                "hint": null,
                "format": "MMYY",
                "value": "1217",
                "originalField": true,
                "isSum": null,
                "nominal": null,
                "editable": true,
                "placeholder": null,
                "mask": null,
                "required": false
            }]
        }

        const dialogBlocks = List([
            Map({
                fields: arrToMap(dialogResponce.fields, DialogFieldsRecord, item => item.name),
            })])


        dialog.setProps({entities: dialogBlocks})

        expect(dialog.length).toBe(1)

        const equals = {
            type: 'text',
            value: '1217',
            readonly: undefined,
            className: 'form-control'
        };

        for (let propName in equals) {
            expect(dialog.find('input').prop(propName)).toEqual(equals[propName])
        }

    })

    it('Числовой input', () => {

        const dialogResponce = {
            fields: [{
                "description": "Сумма (BYN)",
                "name": "sum",
                "type": "R",
                "maxLength": null,
                "minLength": null,
                "min": '0.01',
                "max": 200,
                "hint": null,
                "format": null,
                "value": "",
                "originalField": false,
                "isSum": true,
                "nominal": 0.01,
                "editable": true,
                "placeholder": null,
                "mask": null,
                "required": true
            }]
        }

        const dialogBlocks = List([
            Map({
                fields: arrToMap(dialogResponce.fields, DialogFieldsRecord, item => item.name),
            })])


        dialog.setProps({entities: dialogBlocks})

        expect(dialog.length).toBe(1)

        const equals = {
            name: 'sum',
            type: 'number',
            value: '',
            min: '0.01',
            max: 200,
            required: true,
            className: 'form-group_control'
        };

        for (let propName in equals) {
            expect(dialog.find('input').prop(propName)).toEqual(equals[propName])
        }
    })

    it('Чекбокс', () => {

        const dialogResponce = {
            fields: [{
                "description": "Переключатель",
                "name": "Чекбокс",
                "type": "L",
                "hint": null,
                "value": 0,
                "originalField": true,
                "editable": true,
                "placeholder": null,
            }]
        }

        const dialogBlocks = List([
            Map({
                fields: arrToMap(dialogResponce.fields, DialogFieldsRecord, item => item.name),
            })])

        dialog.setProps({entities: dialogBlocks})

        expect(dialog.length).toBe(1)

        const equals = {
            name: 'Чекбокс',
            type: 'checkbox',
            checked: 0,
            disabled: false,
            className: 'form-group_control'
        };

        for (let propName in equals) {
            expect(dialog.find('input').prop(propName)).toEqual(equals[propName])
        }

        dialog.setState({ 'Чекбокс': 1 })

        expect(dialog.find('input').prop('checked')).toEqual(1)
    })


})