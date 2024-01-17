import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

Modal.propTypes = {
  deleteBlog: PropTypes.func,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.bool.isRequired,
};

export default function Modal({ deleteBlog, setOpen, open, message, action }) {
  return (
    <Dialog
      id="modal"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      <DialogActions id="alert-dialog-actions">
        <Button onClick={() => setOpen(false)}>Close</Button>
        {action && (
          <Button onClick={deleteBlog} color="warning" autoFocus id="action">
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
