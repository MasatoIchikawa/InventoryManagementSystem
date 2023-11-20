import { useState } from "react";

import CustomButton from "../../../components/buttonlist/button/CustomButton.js";
import DialogInOut from "../dialoginouts/DialogInOut.js";

function ButtonOutput({ setReload }) {
    const [open, setOpen] = useState(false);

    const handleClickOpenSimple = () => {
        setOpen(true);
    };

    const item = {
        name: "出庫登録",
        onclick: handleClickOpenSimple
    };
    return (
        <>
            <CustomButton props={item} key={item.name} />
            <DialogInOut open={open} setOpen={setOpen} setReload={setReload} inoutflag={2} />
        </>
    );
}

export default ButtonOutput;