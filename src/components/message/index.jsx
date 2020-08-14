import React from 'react';
import styles from './message.module.scss';

const Message = ({ text, date, sender }) => {
    return (
      <div className={styles.Message}>
        <p>
          <strong>{sender}</strong>: {text}
        </p>
        <small>{date}</small>
      </div>
    );
}

export default Message;