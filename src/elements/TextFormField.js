import React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useField } from 'formik';

export function TextFormField({
  label,
  type = 'text',
  srOnlyLabel = false,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <FormGroup controlId={props.name}>
      <FormLabel srOnly={srOnlyLabel}>{label}</FormLabel>
      <FormControl
        type={type}
        isInvalid={meta.touched && !!meta.error}
        placeholder={srOnlyLabel && label}
        {...field}
        {...props}
      />
      <FormControl.Feedback type="invalid"> {meta.error} </FormControl.Feedback>
    </FormGroup>
  );
}
