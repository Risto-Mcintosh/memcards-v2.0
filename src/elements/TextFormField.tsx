import React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useField } from 'formik';

type inputFieldType = 'text' | 'email' | 'password';

type Props = {
  label: string;
  name: string;
  /** Hides the label visually */
  srOnlyLabel?: boolean;
  /** 'text' | 'email' | 'password'  */
  type?: inputFieldType;
};

export function TextFromField({
  label,
  type = 'text',
  srOnlyLabel = false,
  ...props
}: Props) {
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
