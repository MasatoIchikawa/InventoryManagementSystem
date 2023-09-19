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
    const [reload, setReload] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [json, setJson] = useState();

    const inventory_list = [];
    fetch('/mstinventory/display')
    .then((res) => res.text()).then((data) => {
      setJson(data);
    });
    if(json !== undefined){
      const jsonparse = JSON.parse(json);
      for(let i = 0; i < jsonparse.length; i++){
        const item = jsonparse[i];
        inventory_list.push({
          id: item.inventory_id,
          name: item.inventory_name,
        });
      }
    }

    const handleClickOpenSimple = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setReload(new Date());
    };

    const item = {
        name: "入庫登録",
        onclick: handleClickOpenSimple
    };

    const [id, setID] = useState(0);
    const [date, setDate] = useState(null);
    const [inventory, setInventory] = useState(0);
    const [number, setNumber] = useState(0);
    const [note, setNote] = useState("");
  
    const items = [
        {
            type: "date",
            name: "入出庫日時",
            value: date,
            onchange: setDate
        },
        {
            type: "select",
            name: "在庫マスタ",
            value: inventory,
            onchange: setInventory,
            selecter: inventory_list
        },
        {
            type: "number",
            name: "数量",
            value: number,
            onchange: setNumber,
        },
        {
            type: "text",
            name: "説明",
            value: note,
            onchange: setNote
        }
        ]
    return (
        <>
            <CustomButton props={item} key={item.name}/>
            <CommonDialog 
              title="入庫登録"
              isOpen={open}
              onSave={() => save(handleClose, 1, date, inventory, number, note)}
              onClose={handleClose}
              items={items}
            />
        </>
    );
}

export default ButtonInput;