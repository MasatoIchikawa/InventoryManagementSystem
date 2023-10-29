import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const CommonDelete = ({ rowId, setReload, deletepost }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReload(new Date());
  };

  const deleteRow = (rowId, e) => {
    deletepost();
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleOpen}>
        削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'確認'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">ID「{rowId}」を本当に削除しますか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary" autoFocus>
            やめる
          </Button>
          <Button onClick={(e) => deleteRow(rowId, e)} color="primary">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommonDelete;