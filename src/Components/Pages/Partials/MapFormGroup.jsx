import React from 'react';
import {FormGroup} from "."

export const MapFormGroup = ({fields, state, onChange}) =>
    fields.map(({Name, Type, Label, Required, Min, Max, MinLength, MaxLength, Step}, i) =>
        <FormGroup key={i}
                   name={Name}
                   type={Type}
                   label={Label}
                   required={Required}
                   min={Min}
                   max={Max}
                   step={Step}
                   minLength={MinLength}
                   maxLength={MaxLength}
                   value={state[Name]}
                   errors={state.errors}
                   onChange={onChange}/>)


