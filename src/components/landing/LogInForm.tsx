import React from 'react';
import { Formik, Form } from 'formik';
import { TextFromField } from '../../elements/TextFormField';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LogInForm() {
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
          <TextFromField
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
    </div>
  );
}

export default LogInForm;
