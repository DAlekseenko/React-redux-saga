import expect from 'expect';
import assert from 'assert';
import {List, Map} from 'immutable'
import {DialogFieldsRecord} from "../src/Reducers/entities"
import {arrToMap} from "pbr-lib-front-utils/dateManipulation"
import DialogFieldPreparer from "../src/Utils/DialogFieldPreparer"


describe('Подготовка данных для диалога', () => {

    const dialogResponce = [
        {
            "name": "Комиссия",
            "editable": false,
            "type": "I",
            "value": "0 BYR",
            "originalField": true,
            "description": "Комиссия"
        }, {
            "name": "Cумма с учетом комиссии",
            "editable": false,
            "type": "I",
            "value": "30 000 BYR",
            "originalField": true,
            "description": "Cумма с учетом комиссии"
        }, {
            "description": "Сумма (BYR)",
            "value": "",
            "min": "50",
            "name": "sum",
            "type": "R",
            "isSum": true,
            "editable": true,
            "originalField": false,
            "max": 6300000,
            "readonly": false,
            "nominal": "50"
        }, {
            "name": "Абонентский номер",
            "type": "S",
            "description": "Абонентский номер телефона",
            "required": true,
            "value": '',
            "editable": true,
            "minLength": 11,
            "originalField": true,
        }
    ]

    const dialogBlocks = List([
        Map({
            fields: arrToMap(dialogResponce, DialogFieldsRecord, item => item.name),
            summary: '{summary}'
        })])

    const lengthProp = [{
        minLength: 11,
        maxLength: 11,
        name: 'Hello',
        result: {name: 'name', text: 'длина значения поля должна быть не менее 11'}
    }, {
        maxLength: 5,
        name: 'HelloWorld',
        result: {name: 'name', text: 'длина значения поля должна быть не более 5'}
    }, {
        minLength: 5,
        name: 'HelloWorld',
        result: undefined
    }, {
        name: 'HelloWorld',
        result: undefined
    }]

    for (let prop of lengthProp) {
        it('validate length with ' + prop.name, () => {
            const preparer = new DialogFieldPreparer()
            preparer.values = {name: prop.name}
            preparer.validateLengthString('name', prop)
            expect(preparer.getError()).toEqual(prop.result)
        })
    }

    const getState = [{
        sum: 500,
        'Абонентский номер': '6464464'
    }, {
        sum: 650,
        'Абонентский номер': '64644641251'
    }]

    for (let state of getState) {
        const result = state.sum === 500 ? {"sum": 500} : {"fields[Абонентский номер]": '64644641251', sum: 650}

        const error = {name: 'Абонентский номер', text: 'длина значения поля должна быть не менее 11'}

        it('prepare Dialog Fields', () => {
            const preparer = new DialogFieldPreparer(state, dialogBlocks)
            preparer.getError() && expect(preparer.getError()).toEqual(error)
        })
    }

    it('test preparation with null', () => {
        const preparer = new DialogFieldPreparer(null, dialogBlocks)
        expect(preparer.getFields()).toEqual({})
    })

    it('test preparation with undefined', () => {
        const preparer = new DialogFieldPreparer(getState[0], undefined)
        expect(preparer.getFields()).toEqual({})
    })
})



