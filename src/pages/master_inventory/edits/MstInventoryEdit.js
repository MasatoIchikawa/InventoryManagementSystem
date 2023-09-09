import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import MstInventoryDialog from '../dialogs/MstInventoryDialog.js';

const MstInventoryEdit = ({ rowId }) => {
  const [open, setOpen] = useState(false); // 確認ダイアログの表示/非表示

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        編集
      </Button>

      <MstInventoryDialog rowid={rowId} isOpen={open} onClose={handleClose} />
    </div>
  );
};

export default MstInventoryEdit;