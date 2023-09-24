import React, { useState } from 'react';
import { Button } from "@mui/material";

import DialogInput from '../dialoginputs/DialogInput.js';

const ButtonInputEdit = ({ rowId, setReload }) => {
  const [open, setOpen] = useState(false); // 確認ダイアログの表示/非表示

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        編集
      </Button>

      <DialogInput open={open} setOpen={setOpen} setReload={setReload} rowId={rowId}  />
    </div>
  );
};

export default ButtonInputEdit;