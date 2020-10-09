import React from 'react';
import { login } from '../../service/auth';
import { Formik, Form } from 'formik';
import { TextFormField } from '../../elements/TextFormField';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('invalid email').required('email is required'),
  password: Yup.string().required('password is required')
});

function LogInForm({ setAuthenticatedUser, hydrate }) {
  const initialValues = {
    email: '',
    password: ''
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={LoginSchema}
        onSubmit={(values, { setErrors }) => {
          login(values)
            .then((response) => {
              setAuthenticatedUser(true, response.data);
              hydrate();
            })
            .catch((err) => {
              console.log(err);
              setErrors({
                email: err.response.data,
                password: err.response.data
              });
            });
          return;
        }}
      >
        <Form>
          <TextFormField label="Email" srOnlyLabel={true} name="email" />
          <TextFormField
            label="Password"
            srOnlyLabel={true}
            name="password"
            type="password"
          />
          <Button variant="success" type="submit" block>
            Login
          </Button>
        </Form>
      </Formik>
      <div className="d-flex flex-column justify-content-center mt-2">
        <Link
          className=" bg-white text-secondary text-center font-weight-bold p-1 mb-2 rounded"
          to="/register"
        >
          Sign Up
        </Link>

        <Link
          className=" bg-white text-secondary text-center font-weight-bold p-1 rounded"
          to="/register"
        >
          Sign In As Guest
        </Link>
      </div>
    </>
  );
}

export default LogInForm;
