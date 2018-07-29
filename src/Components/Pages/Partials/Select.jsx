import React from 'react'

export const Select = ({name, onChange, selected, modifier, children}) =>
    <select className={modifier} name={name} onChange={onChange} value={selected}>
        {children}
    </select>


