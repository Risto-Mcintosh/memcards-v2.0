import React from 'react';

type Props = {
  heading: string;
  subheading?: string;
};

export default function FormHeading({ heading, subheading = null }: Props) {
  return (
    <div className="px-1 text-center">
      <h1 data-testid="form-heading">{heading}</h1>
      {subheading && <p className="m-0">{subheading}</p>}
    </div>
  );
}
