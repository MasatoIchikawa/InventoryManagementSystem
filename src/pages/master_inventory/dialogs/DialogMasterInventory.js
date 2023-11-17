import { useState } from "react";

import CommonDialog from "../../../components/commondialogs/CommonDialog.js";

function save (onClose, id, name, kana, jan, sku, unit, location, note, display){
    const json = {
      inventory_id: id,
      inventory_name: name,
      inventory_kana: kana,
      tag: '',
      jancode: jan,
      skucode: sku,
      unit: unit,
      location: location,
      note: note,
      display_flag: display,
      insert_user_id: 0
    };
  
    fetch('/mstinventory/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json)
    })
    .then(response => {
      if(response.status !== 200){
        console.warm('mstinventory_insertが失敗しました');
      }
      onClose();
    })
    .catch(error => {
      console.error(error);
    })
  }

function DialogMasterInventory({ rowid, open, setOpen, setReload }){
    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [kana, setKana] = useState("");
    const [jancode, setJancode] = useState("");
    const [skucode, setSkucode] = useState("");
    const [unit, setUnit] = useState("");
    const [location, setLocation] = useState("");
    const [note, setNote] = useState("");
    const [display, setDisplay] = useState(1);

    if(!open) return;

    if(rowid !== 0 && rowid !== id){
    const params = {
        "inventory_id": rowid,
    };
    const query = new URLSearchParams(params);
    fetch('/mstinventory_edit?' + query)
    .then((res) => res.text()).then((json) => {
        const result = JSON.parse(json);
        for(let i = 0; i < result.length; i++){
          const item = result[i];
          setID(item.inventory_id);
          setName(item.inventory_name);
          setKana(item.inventory_kana);
          setJancode(item.jancode);
          setSkucode(item.skucode);
          setUnit(item.unit);
          setLocation(item.location);
          setNote(item.note);
          setDisplay(item.display_flag);
        }
    });
    }

    const handleClose = () => {
        setOpen(false);
        setReload(new Date());
    };

    const handleOptionChange = (display) => {
        setDisplay(display);
    };

    // const previewImage = (obj) => {
    //     var fileReader = new FileReader();
    //     fileReader.onload = (function() {
    //       document.querySelector('#dialog-preview').src = fileReader.result;
    //       setPicture(fileReader.result);
    //     });
      
    //     if(obj === null || obj.target.files[0] === undefined) {
    //       document.querySelector('#dialog-preview').src = '';
    //       setPicture('');
    //       return;
    //     }
      
    //     fileReader.readAsDataURL(obj.target.files[0]);
    // }
  
    const items = [
        {
            type: "text",
            key: "name",
            name: "名称",
            Required: true,
            value: name,
            onchange: setName
        },
        {
            type: "text",
            key: "kana",
            name: "フリガナ",
            Required: true,
            value: kana,
            onchange: setKana
        },
        // {
        //     type: "file",
        //     key: "picture",
        //     name: "画像",
        //     Required: true,
        //     value: picture,
        //     onchange: previewImage
        // },
        {
            type: "text",
            key: "jancode",
            name: "JANコード",
            Required: true,
            value: jancode,
            onchange: setJancode
        },
        {
            type: "text",
            key: "skucode",
            name: "SKUコード",
            Required: true,
            value: skucode,
            onchange: setSkucode
        },
        {
            type: "text",
            key: "unit",
            name: "単位",
            Required: true,
            value: unit,
            onchange: setUnit
        },
        {
            type: "text",
            key: "location",
            name: "保管場所",
            Required: true,
            value: location,
            onchange: setLocation
        },
        {
            type: "text",
            key: "note",
            name: "説明",
            Required: true,
            value: note,
            onchange: setNote
        },
        {
            type: "radio",
            key: "display",
            name: "表示",
            Required: true,
            value: display,
            onchange: setDisplay,
            selecter: [
              {
                id: 1,
                name: "表示する",
              },
              {
                id: 2,
                name: "表示しない",
              }]
        }]

    return (
        <>
            <CommonDialog 
              title={"在庫マスタ " + (rowid > 0 ? "-編集-" : "-新規追加-")}
              isOpen={open}
              onSave={() => save(handleClose, rowid, name, kana, jancode, skucode, unit, location, note, display)}
              onClose={handleClose}
              items={items}
            />
        </>
    );
}

export default DialogMasterInventory;