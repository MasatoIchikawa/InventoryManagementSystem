import React, { useState } from 'react';
import { Button } from "@mui/material";

import DialogMasterInventory from '../dialogs/DialogMasterInventory';

const ButtonEditMasterInventory = ({ rowid, setReload }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="inherit" onClick={handleOpen}>
        編集
      </Button>

      <DialogMasterInventory rowid={rowid} open={open} setOpen={setOpen} setReload={setReload} />
    </div>
  );
};

export default ButtonEditMasterInventory;