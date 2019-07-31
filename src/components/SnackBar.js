import React from 'react';
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
