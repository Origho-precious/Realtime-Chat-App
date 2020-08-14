import React from 'react';
import { Link } from 'react-router-dom';
import styles from './linkbutton.module.scss';

const LinkButton = ({ to, children, outline }) => {
    return (
        <>
            <Link
                className={ outline ? styles.outline : styles.normal }
                to={to}
            >
                {children}
            </Link>
        </>
    );
}

export default LinkButton;