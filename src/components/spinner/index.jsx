import React from 'react';
import styles from './spinner.module.scss';

const Spinner = () => {
    return (
        <div className={styles.Conttainer}>
            <div className={styles.spinner}></div>
        </div>
    );
}

export default Spinner ;