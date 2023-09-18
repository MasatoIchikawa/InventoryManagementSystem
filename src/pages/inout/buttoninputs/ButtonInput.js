import { useState } from "react";

import CustomButton from "../../../components/buttonlist/button/CustomButton.js";
import CommonDialog from "../../../components/commondialogs/CommonDialog.js";

function save (onClose, flag, datetime, inventory_id, inventory, note){
    const json = {
      inout_flag: flag,
      inout_datetime: datetime,
      inventory_id: inventory_id,
      inventory: inventory,
      note: note,
      insert_user_id: 0
    };
  
    fetch('/input/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json)
    })
    .then(response => {
      if(response.status !== 200){
        console.warm('insertが失敗しました');
      }
      onClose();
    })
    .catch(error => {
      console.error(error);
    })
}

function ButtonInput(){
    const [open, setOpen] = useState(false);

    const handleClickOpenSimple = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    //   window.location.reload();
    };

    const item = {
        name: "入庫登録",
        onclick: handleClickOpenSimple
    };

    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [kana, setKana] = useState("");
    // const [picture, setPicture] = useState(null);
    // const [category, setCategory] = useState(0);
    // const [jancode, setJancode] = useState("");
    // const [skucode, setSkucode] = useState("");
    // const [unit, setUnit] = useState(0);
    // const [price, setPrice] = useState(null);
    // const [pricecost, setPricecost] = useState(null);
    // const [max, setMax] = useState(null);
    // const [min, setMin] = useState(null);
    // const [location, setLocation] = useState("");
    // const [url, setUrl] = useState("");
    // const [note, setNote] = useState("");
    // const [display, setDisplay] = useState(1);
  
    const items = [
        {
            type: "date",
            name: "入出庫日時",
            value: name,
            onchange: setName
        },
        {
            type: "select",
            name: "在庫マスタ",
            value: kana,
            onchange: setKana
        },
        {
            type: "text",
            name: "数量",
            value: kana,
            onchange: setKana
        },
        {
            type: "text",
            name: "説明",
            value: kana,
            onchange: setKana
        }
        ]
    return (
        <>
            <CustomButton props={item} key={item.name}/>
            <CommonDialog title="入庫登録" isOpen={open} onSave={save} onClose={handleClose} items={items}/>

            {/* <MstInventoryDialog rowid={0} isOpen={open} onClose={handleClose} /> */}
        </>
    );
}

export default ButtonInput;