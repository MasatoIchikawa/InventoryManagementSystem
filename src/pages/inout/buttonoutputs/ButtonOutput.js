import { useState } from "react";

import CustomButton from "../../../components/buttonlist/button/CustomButton.js";

function ButtonOutput(){
    const [open, setOpen] = useState(false);

    const handleClickOpenSimple = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    };

    const item = {
        name: "出庫登録",
        onclick: handleClickOpenSimple
    };
    return (
        <>
            <CustomButton props={item} key={item.name}/>

            {/* <MstInventoryDialog rowid={0} isOpen={open} onClose={handleClose} /> */}
        </>
    );
}

export default ButtonOutput;