import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styles from '../signupForm/form.module.scss';
import Button from "../../button";
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
    auth.signInWithEmailAndPassword(email, password);
  };

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
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
}

const validate = (formValues) => {
  const errors = {};

  if(!formValues.email){
      errors.email = 'Required!'
  }

  if(!formValues.password){
      errors.password = 'Required!'
  }

  return errors
}

const form = reduxForm({
  form: 'Signin',
  validate
})(Form);

export default connect(null)(form);