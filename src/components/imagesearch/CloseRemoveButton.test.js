import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import CloseRemoveButton from './CloseRemoveButton';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

test('button will call the setToggle function with fnParam prop', () => {
  const setToggle = jest.fn();
  const fnParam = true;
  const { getByText } = render(
    <CloseRemoveButton
      fn={setToggle}
      fnParam={fnParam}
      text="Close"
      ariaLabel=" "
    />
  );
  fireEvent.click(getByText('Close'));
  expect(setToggle).toHaveBeenCalledWith(!fnParam);
});
