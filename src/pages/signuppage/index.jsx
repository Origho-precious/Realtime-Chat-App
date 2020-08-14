import React from 'react';
import { Link } from 'react-router-dom'
import styles from './signup.module.scss';
import Form from '../../components/form/signupForm';
import Button from '../../components/button';
import { signInWithGoogle } from '../../firebase';

const Signup = (props) => {
    return (
      <div className={styles.Signup}>
        <h1>Sign up</h1>
        <h3>Get an account to start chatting with your friends!</h3>
        <Form />
        <hr />
        <div className={styles.google}>
          <h3>You can also sign up with google</h3>
          <Button click={signInWithGoogle} type="button" google>
            Sign up With Google
          </Button>
        </div>
        <p>
          Already have an account? &nbsp;
          <Link to="/signin">Sign in</Link>
        </p>
      </div>
    );
}

export default Signup;