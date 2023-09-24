import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// function post (id){
//   const json = {
//     inventory_id: id,
//   };

//   fetch('/mstinventory_delete', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(json)
//   })
//   .then(response => {
//     if (response.status === 200) {
//       return response.json()
//     } else {
//       console.warn('Something went wrong on api server!');
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   })
// }

const CommonDelete = ({ rowId, setReload, deletepost }) => {
  const [open, setOpen] = useState(false); // 確認ダイアログの表示/非表示

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
      <Button variant="outlined" color="primary" onClick={handleOpen}>
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