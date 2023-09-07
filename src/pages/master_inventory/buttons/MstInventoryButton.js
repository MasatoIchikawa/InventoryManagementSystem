import { useState } from "react";

import CustomButton from "../../../components/buttonlist/button/CustomButton.js";
import MstInventoryDialog from "../dialogs/MstInventoryDialog.js";
import "./MstInventoryButton.css";

function MstInventoryButton(){
    const [open, setOpen] = useState(false);

    const handleClickOpenSimple = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    };

    const buttons = [{
        name: "新規登録",
        onclick: handleClickOpenSimple
    }];
    return (
        <section className="buttonsection">
            {buttons.map((item) => <CustomButton props={item} key={item.name}/>)}

            <MstInventoryDialog id={0} isOpen={open} onClose={handleClose} />
        </section>
    );
}

export default MstInventoryButton;