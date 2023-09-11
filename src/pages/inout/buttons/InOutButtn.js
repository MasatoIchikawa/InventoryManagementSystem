import { useState } from "react";

import CustomButton from "../../../components/buttonlist/button/CustomButton.js";
import "./InOutButton.css";

function InOutButton(){
    const [open, setOpen] = useState(false);

    const handleClickOpenSimple = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    };

    const buttons = [{
        name: "入庫登録",
        onclick: handleClickOpenSimple
    },
    {
        name: "出庫登録",
        onclick: handleClickOpenSimple
    }];
    return (
        <section className="buttonsection">
            {buttons.map((item) => <CustomButton props={item} key={item.name}/>)}

            {/* <MstInventoryDialog rowid={0} isOpen={open} onClose={handleClose} /> */}
        </section>
    );
}

export default InOutButton;