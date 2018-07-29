import React from 'react'
import {DialogFormGroup} from "./index"
import {mapToArr} from "pbr-lib-front-utils/dateManipulation"

export function DialogBlock(props) {
    return <div>
        {props.fields.map((field, i) => <DialogFormGroup key={i} {...field.toObject()} {...props} />)}
        <div className='help'>{props.summary}</div>
    </div>
}


export function DialogMap(props) {
    return props.entities.map((record, i) =>
        <DialogBlock key={i}
                     fields={mapToArr(record.get('fields'))}
                     summary={record.get('summary')}
                     disabled={props.entities.size > ++i}
                     {...props}/>)
}

