import React from 'react';
import { Formik, Form } from 'formik';
import { TextFromField } from '../../elements/TextFormField';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function RegisterForm() {
  return (
    <div>
      <Formik
        initialValues={{
          userName: '',
          password: ''
        }}
        onSubmit={() => console.log('submitted!')}
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
    </div>
  );
}

export default RegisterForm;
