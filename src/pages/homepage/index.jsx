import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './homepage.module.scss';
import LinkButton from '../../components/button/linkButton';

class HomePage extends Component {
    render() {
        const { user } = this.props;

        return (
          <div className={styles.Home}>
            <div className={styles.showcase}>
              {!user ? (
                <h1>
                  Hey! there, Welcome this is a platform for easy
                  communications.
                </h1>
              ) : (
                <h1>Welcome back, {user.email}</h1>
              )}
            </div>
            <div className={styles.cta}>
              {!user ? (
                <>
                  <LinkButton to="/signin">Signin</LinkButton>
                  <LinkButton to="/signup" outline>
                    Signup
                  </LinkButton>
                </>
              ) : (
                <LinkButton to="/discussions">Go to Chats</LinkButton>
              )}
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

export default connect(mapStateToProps)(HomePage);