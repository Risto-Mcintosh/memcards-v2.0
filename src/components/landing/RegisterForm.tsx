import React from 'react';
import { registerUser, RegisterUserValues } from '../../service/auth';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextFromField } from '../../elements/TextFormField';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AxiosError } from 'axios';

const RegisterSchema = Yup.object().shape({
  userName: Yup.string()
    .matches(/^\S*$/, 'no spaces allowed')
    .required()
    .trim(),
  email: Yup.string()
    .email('invalid email')
    .required('email is required'),
  password: Yup.string()
    .required('password is required')
    .min(5)
});

type Props = {
  setAuthenticatedUser: (isAuthenticated: boolean, userName: string) => void;
};

function RegisterForm({ setAuthenticatedUser }: Props) {
  const initialValues: RegisterUserValues = {
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
        onSubmit={(
          values,
          { setFieldError }: FormikHelpers<RegisterUserValues>
        ) => {
          registerUser(values)
            .then(response => setAuthenticatedUser(true, response.data))
            .catch((err: AxiosError) =>
              setFieldError('email', err.response.data)
            );
        }}
      >
        <Form>
          <TextFromField label="User Name" srOnlyLabel={true} name="userName" />
          <TextFromField label="Email" srOnlyLabel={true} name="email" />
          <TextFromField
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
