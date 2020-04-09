import { useState } from 'react';
import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Delete from '@material-ui/icons/Delete';

import { signoutUser } from '../../lib/auth';
import { deleteUser } from '../../lib/api';

const DeleteUser = (props) => {
  const { user } = props;

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteUser = () => {
    setIsDeleting(true);
    deleteUser(user._id)
      .then(() => {
        signoutUser();
        Router.push('/signup');
      })
      .catch((err) => {
        console.log(err);
        setIsDeleting(false);
      });
  };
  return (
    <div>
      <IconButton onClick={handleOpen} color="secondary">
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            disabled={isDeleting}
            color="secondary"
          >
            {isDeleting ? 'Deleting...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
