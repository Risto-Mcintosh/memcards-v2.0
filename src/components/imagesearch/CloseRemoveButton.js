import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line object-curly-newline
export default function CloseRemoveButton({ ariaLabel, fn, fnParam, text }) {
  return (
    <button
      style={{
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        background: 'none',
        border: 'none'
      }}
      type="button"
      aria-label={ariaLabel}
      className="p-0 bg-0 text-primary"
      onClick={() => (fnParam ? fn(!fnParam) : fn())}
    >
      {text}
    </button>
  );
}

CloseRemoveButton.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  fn: PropTypes.func.isRequired,
  fnParam: PropTypes.bool,
  text: PropTypes.string.isRequired
};

CloseRemoveButton.defaultProps = {
  fnParam: null
};
