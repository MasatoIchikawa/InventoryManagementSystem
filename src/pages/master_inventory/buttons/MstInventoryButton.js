import { useState } from "react";

import CustomButton from "../../../components/buttonlist/button/CustomButton.js";
import MstInventoryDialog from "../dialogs/MstInventoryDialog.js";
import "./MstInventoryButton.css";

function MstInventoryButton({ setReload }){
    const [open, setOpen] = useState(false);

    const handleClickOpenSimple = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setReload(new Date());
    };

    const buttons = [{
        name: "新規登録",
        onclick: handleClickOpenSimple
    }];
    return (
        <section className="buttonsection">
            {buttons.map((item) => <CustomButton props={item} key={item.name}/>)}

            <MstInventoryDialog rowid={0} isOpen={open} onClose={handleClose} />
        </section>
    );
}

export default MstInventoryButton;