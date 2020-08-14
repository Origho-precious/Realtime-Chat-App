import React from 'react';
import styles from './button.module.scss'

const Button = ({ type, children, google, click }) => {
    return (
        <>
            <button
                onClick={click ? click : null}
                className={google ? styles.google : styles.normal}
                type={type}
            >
                {children}
            </button>
        </>
    );
}

export default Button;