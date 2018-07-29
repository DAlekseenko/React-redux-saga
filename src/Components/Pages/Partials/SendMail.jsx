import React from 'react';
import FormGroup from "./FormGroup"

export const SendMail = ({onSubmit, value, onChange, disabled, errors, success,successMsg}) =>
    <form className='email-sender' onSubmit={onSubmit}>
        <FormGroup
            inputModifier='email-sender_input'
            name='email'
            type='email'
            value={value}
            placeholder='Введите E-mail'
            required={true}
            disabled={disabled}
            onChange={onChange}
            errors={errors}/>
        <button className='email-sender_button' disabled={disabled}>Отправить</button>
        {success && <span className='email-sender_success'>{successMsg}</span>}
    </form>



