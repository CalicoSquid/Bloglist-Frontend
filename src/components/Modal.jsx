import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

Modal.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default function Modal({ deleteBlog, setOpen, open, name }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete ${name}?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
        <Button onClick={deleteBlog} color="warning" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
