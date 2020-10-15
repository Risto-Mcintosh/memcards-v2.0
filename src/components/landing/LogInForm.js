import React from 'react';
import { Formik, Form } from 'formik';
import { TextFormField } from '../../elements/TextFormField';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { useAuth } from 'context/auth-context';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('invalid email').required('email is required'),
  password: Yup.string().required('password is required')
});

function LogInForm({ showRegisterForm }) {
  const { login } = useAuth();
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
          login(values).catch((err) => {
            console.log(err);
            setErrors({
              email: err.response.data,
              password: err.response.data
            });
          });
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
        <Button
          className=" bg-white text-secondary text-center font-weight-bold p-1 mb-2 rounded"
          onClick={() => showRegisterForm(true)}
        >
          Sign Up
        </Button>

        {/* <Link
          className=" bg-white text-secondary text-center font-weight-bold p-1 rounded"
          to="/register"
        >
          Sign In As Guest
        </Link> */}
      </div>
    </>
  );
}

export default LogInForm;
