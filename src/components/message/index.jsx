import React from 'react';
import { connect } from 'react-redux';
import styles from './message.module.scss';
import { deleteMessage } from '../../redux/actions';

const Message = ({ text, date, sender, id, deleteMessage }) => {
  return (
    <div className={styles.Message}>
      <p>
        <strong>{sender}</strong>: {text}
      </p>
      <div className={styles.flexBox}>
        <small>{date}</small>
        <p
          onClick={ () => deleteMessage(id) }
          className={styles.delete}>
          &times;
        </p>
      </div>
    </div>
  );
}

export default connect(null, { deleteMessage })(Message);