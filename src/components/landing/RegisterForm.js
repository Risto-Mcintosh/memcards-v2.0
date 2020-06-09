import React from 'react';
import { registerUser } from '../../service/auth';
import { Formik, Form } from 'formik';
import { TextFormField } from '../../elements/TextFormField';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RegisterSchema = Yup.object().shape({
  userName: Yup.string()
    .matches(/^\S*$/, 'no spaces allowed')
    .required()
    .trim(),
  email: Yup.string().email('invalid email').required('email is required'),
  password: Yup.string().required('password is required').min(5)
});

function RegisterForm({ setAuthenticatedUser }) {
  const initialValues = {
    userName: '',
    email: '',
    password: ''
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        validateOnChange={false}
        onSubmit={(values, { setFieldError }) => {
          registerUser(values)
            .then((response) => setAuthenticatedUser(true, response.data))
            .catch((err) => setFieldError('email', err.response.data));
        }}
      >
        <Form>
          <TextFormField label="User Name" srOnlyLabel={true} name="userName" />
          <TextFormField label="Email" srOnlyLabel={true} name="email" />
          <TextFormField
            label="Password"
            srOnlyLabel={true}
            name="password"
            type="password"
          />
          <Button variant="secondary" type="submit" block>
            Register
          </Button>
        </Form>
      </Formik>
      <div className="mt-2">
        <Link
          className=" d-block w-100 bg-white text-secondary text-center font-weight-bold p-1 rounded"
          to="/login"
        >
          Login
        </Link>
      </div>
    </>
  );
}

export default RegisterForm;
