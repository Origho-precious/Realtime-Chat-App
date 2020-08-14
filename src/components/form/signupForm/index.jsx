import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styles from './form.module.scss';
import Button from '../../button';
import { auth } from '../../../firebase';

const Form = (props) => {
  const renderForm = ({ id, input, placeholder, type, meta }) => {
    return (
        <div className={styles.formWrapper}>
            <input {...input} type={type} id={id} />
            <label htmlFor={id} className={input.value.length > 0 ? styles.shrink : null}>
            {placeholder}
            </label>
            {renderError(meta)}
        </div>
    );
  }

  const renderError = ({error, touched}) => {
    if(touched && error){
        return <p className={styles.error}>{error}</p>;
    }
  }

  const submitHandler = ({ email, password }) => {
    auth.createUserWithEmailAndPassword(email, password)
  }

  return (
    <div className={styles.Form}>
      <form onSubmit={props.handleSubmit(submitHandler)}>
        <Field
          name="email"
          component={renderForm}
          type="email"
          placeholder="Email"
          id="email"
        />
        <Field
          name="password"
          component={renderForm}
          type="password"
          placeholder="Password"
          id="password"
        />
        <Field
          name="confirmpassword"
          component={renderForm}
          type="password"
          placeholder="Confirm Password"
          id="password2"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
    errors.email = "Invalid email address";
  }

  if(!formValues.password ){
    errors.password = 'Enter Password'
  }else if (formValues.password.length < 6 || formValues.password.length > 10) {
    errors.password = "Password must be at between 6 - 10 letters long";
  }

  if(!formValues.confirmpassword || (formValues.password !== formValues.confirmpassword)){
    errors.confirmpassword = `Passwords don't match`
  }

  return errors
}

const form = reduxForm({
  form: 'Signin',
  validate
})(Form);

export default connect(null)(form);