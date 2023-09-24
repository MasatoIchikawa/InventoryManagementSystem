import { useState } from "react";

import CustomButton from "../../../components/buttonlist/button/CustomButton.js";
import DialogInput from "../dialoginputs/DialogInput.js";

function ButtonInput({ setReload }){
    const [open, setOpen] = useState(false);

    const handleClickOpenSimple = () => {
      setOpen(true);
    };

    const item = {
        name: "入庫登録",
        onclick: handleClickOpenSimple
    };

    return (
        <>
            <CustomButton props={item} key={item.name}/>
            <DialogInput open={open} setOpen={setOpen} setReload={setReload} />
        </>
    );
}

export default ButtonInput;