import React, { useState } from 'react';
import { Button } from "@mui/material";

import DialogMasterAccount from '../dialogs/DialogMasterAccount';

const ButtonEditMasterAccount = ({ rowId, setReload }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="inherit" onClick={handleOpen}>
        編集
      </Button>

      <DialogMasterAccount open={open} setOpen={setOpen} setReload={setReload} rowId={rowId} />
    </div>
  );
};

export default ButtonEditMasterAccount;