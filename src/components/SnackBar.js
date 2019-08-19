/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export default function SnackBar({ message, showState, setSnackBar }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      autoHideDuration={2000}
      open={showState}
      onClose={() => setSnackBar({ show: false, message: '' })}
    >
      <SnackbarContent
        classes={{ root: 'bg-success' }}
        message={<span>{message}</span>}
      />
    </Snackbar>
  );
}

SnackBar.propTypes = {
  message: PropTypes.string,
  showState: PropTypes.bool,
  setSnackBar: PropTypes.func
};
