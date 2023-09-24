import { useState } from "react";

import CommonDialog from "../../../components/commondialogs/CommonDialog.js";

function save (onClose, id, flag, datetime, inventory_id, inventory, note){
    const json = {
      inout_id: id,
      inout_flag: flag,
      inout_datetime: new Date(datetime).toLocaleString('ja-JP'),
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

function DialogInput({ open, setOpen, setReload, rowId }){
    const [json, setJson] = useState();

    const [id, setID] = useState(0);
    const [date, setDate] = useState(null);
    const [flag, SetFlag] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [number, setNumber] = useState(0);
    const [note, setNote] = useState("");

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

    if(rowId !== 0 && rowId !== id){
        const params = {
            "inout_id": rowId,
        };
        const query = new URLSearchParams(params);
        fetch('/inout/edit?' + query)
        .then((res) => res.text()).then((json) => {
            const row2 = JSON.parse(json);
            for(let i = 0; i < row2.length; i++){
              const item = row2[i];
              setID(item.inout_id);
              SetFlag(item.inout_flag);
              setDate(item.inout_datetime);
              setInventory(item.inventory_id);
              setNumber(item.inventory);
              setNote(item.note);
            }
        });
      }

    const handleClose = () => {
        setOpen(false);
        setReload(new Date());
    };
  
    const items = [
        {
            type: "date",
            key: "date",
            name: "入出庫日時",
            Required: true,
            value: date,
            onchange: setDate
        },
        {
            type: "select",
            key: "inventory",
            name: "在庫マスタ",
            Required: false,
            value: inventory,
            onchange: setInventory,
            selecter: inventory_list
        },
        {
            type: "number",
            key: "number",
            name: "数量",
            Required: false,
            value: number,
            onchange: setNumber,
        },
        {
            type: "text",
            key: "note",
            name: "説明",
            Required: false,
            value: note,
            onchange: setNote
        }
        ]

    return (
        <>
            <CommonDialog 
              title="入庫登録"
              isOpen={open}
              onSave={() => save(handleClose, id, 1, date, inventory, number, note)}
              onClose={handleClose}
              items={items}
            />
        </>
    );
}

export default DialogInput;