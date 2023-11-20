import { useState } from "react";

import CustomButton from "../../../components/buttonlist/button/CustomButton.js";
import DialogMasterInventory from "../dialogs/DialogMasterInventory.js";
import "../../../utils/ButtonList.css";

function ButtonMasterInventory({ setReload }) {
    const [open, setOpen] = useState(false);

    const handleClickOpenSimple = () => {
        setOpen(true);
    };

    const buttons = [{
        name: "新規登録",
        onclick: handleClickOpenSimple
    }];
    return (
        <section className="buttonsection">
            {buttons.map((item) => <CustomButton props={item} key={item.name} />)}

            <DialogMasterInventory rowid={0} open={open} setOpen={setOpen} setReload={setReload} />
        </section>
    );
}

export default ButtonMasterInventory;