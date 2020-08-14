import React from 'react';
import { Link } from 'react-router-dom'
import styles from './signin.module.scss';
import Form from '../../components/form/signinForm';
import Button from '../../components/button';
import { signInWithGoogle } from '../../firebase'


const Signin = (props) => {
    return (
      <div className={styles.Signin}>
        <h1>Sign in</h1>
        <h3>Start chatting with your friends seemlessly!</h3>
        <Form />
        <hr />
        <div className={styles.google}>
          <h3>If you signed up with google, here you go!</h3>
          <Button click={signInWithGoogle} type="button" google>
            Sign in With Google
          </Button>
        </div>
        <p>
          Don't have an account? &nbsp;
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    );
}

export default Signin;