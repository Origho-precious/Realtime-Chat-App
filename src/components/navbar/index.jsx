import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import { signOut } from '../../firebase';
import { ReactComponent as Menu } from '../../assets/icons8-menu.svg';
import { ReactComponent as CloseMenu } from '../../assets/icons8-cancel.svg';

class Navbar extends Component {
  state = {
    openMenu: true
  }

  toggleMenu = () => {
    this.setState({openMenu: !this.state.openMenu})
  }

  render() {
    const { user } = this.props;
    const { openMenu } = this.state

    return (
      <div className={styles.Nav}>
        <Link to="/" className={styles.logo}>
          DIZCUZZ
        </Link>
        <div onClick={() => this.toggleMenu()} className={styles.hamburger}>{openMenu ? <Menu /> : <CloseMenu />}</div>
        <div className={ openMenu ? styles.navItems : styles.show}>
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