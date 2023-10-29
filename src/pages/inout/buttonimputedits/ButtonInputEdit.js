import React, { useState } from 'react';
import { Button } from "@mui/material";

import DialogInput from '../dialoginouts/DialogInOut.js';

const ButtonInputEdit = ({ rowId, setReload }) => {
  const [open, setOpen] = useState(false); // 確認ダイアログの表示/非表示

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="inherit" onClick={handleOpen}>
        編集
      </Button>

      <DialogInput open={open} setOpen={setOpen} setReload={setReload} inoutflag={1} rowId={rowId}  />
    </div>
  );
};

export default ButtonInputEdit;