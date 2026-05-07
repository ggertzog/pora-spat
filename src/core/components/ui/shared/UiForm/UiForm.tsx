import React, { InputHTMLAttributes } from 'react'
import ButtonIconRounded from '../ButtonIconRounded/ButtonIconRounded'
import styles from './styles.module.scss'

interface UiFormProps extends InputHTMLAttributes<HTMLFormElement> {
    placeholder: string;

}

const UiForm = ({ placeholder, onSubmit }: UiFormProps) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.formLabel} htmlFor="">
                <input className={styles.formInput} type="email" placeholder={placeholder} />
                <ButtonIconRounded icon='arrowRight' />
                {/* <span></span> */}
            </label>
        </form>
    )
}

export default UiForm;