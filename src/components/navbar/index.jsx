import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import { signOut } from '../../firebase';

class Navbar extends Component {

  render() {
    const { user } = this.props;

    return (
      <div className={styles.Nav}>
        <Link to="/" className={styles.logo}>
          DIZCUZZ
        </Link>
        <div className={styles.navItems}>
          {!user ? (
            <Link to="/signin" className={styles.link}>
              SIGN IN
            </Link>
          ) : (
            <div onClick={() => signOut()} className={styles.link}>
              {" "}
              SIGN OUT
            </div>
          )}
          {!user ? (
            <Link to="/signup" className={styles.link}>
              SIGN UP
            </Link>
          ) : null}
          <Link to="/discussions" className={styles.link}>
            CHATS
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(Navbar);