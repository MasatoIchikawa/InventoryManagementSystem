import { useState } from "react";

import CommonDialog from "../../../components/commondialogs/CommonDialog.js";

function save (onClose, id, name, kana, picture, category, jan, sku, unit, pri, pricost, max, min, lo, u, n, display){
    const json = {
      inventory_id: id,
      inventory_name: name,
      inventory_kana: kana,
      picture: picture,
      category_id: category,
      jancode: jan,
      skucode: sku,
      unit_id: unit,
      price: pri,
      price_cost: pricost,
      inventory_max: max,
      inventory_min: min,
      location: lo,
      url: u,
      note: n,
      display_flag: display,
      insert_user_id: 0
    };
  
    fetch('/mstinventory_insert', {
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
    const [picture, setPicture] = useState(null);
    const [category, setCategory] = useState(0);
    const [jancode, setJancode] = useState("");
    const [skucode, setSkucode] = useState("");
    const [unit, setUnit] = useState(0);
    const [price, setPrice] = useState(null);
    const [pricecost, setPricecost] = useState(null);
    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);
    const [location, setLocation] = useState("");
    const [url, setUrl] = useState("");
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
        const row2 = JSON.parse(json);
        for(let i = 0; i < row2.length; i++){
          const item = row2[i];
          setID(item.inventory_id);
          setName(item.inventory_name);
          setKana(item.inventory_kana);
          setPicture(item.picture);
          setCategory(item.category_id);
          setJancode(item.jancode);
          setSkucode(item.skucode);
          setUnit(item.unit_id);
          setPrice(item.price);
          setPricecost(item.price_cost);
          setMax(item.inventory_max);
          setMin(item.inventory_min);
          setLocation(item.location);
          setUrl(item.url);
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

    const previewImage = (obj) => {
        var fileReader = new FileReader();
        fileReader.onload = (function() {
          document.querySelector('#dialog-preview').src = fileReader.result;
          setPicture(fileReader.result);
        });
      
        if(obj === null || obj.target.files[0] === undefined) {
          document.querySelector('#dialog-preview').src = '';
          setPicture('');
          return;
        }
      
        fileReader.readAsDataURL(obj.target.files[0]);
    }
  
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
        {
            type: "text",
            key: "category",
            name: "カテゴリ",
            Required: true,
            value: category,
            onchange: setCategory
        },
        {
            type: "file",
            key: "picture",
            name: "画像",
            Required: true,
            value: picture,
            onchange: previewImage
        },
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
            name: "権限レベル",
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
              onSave={() => save(handleClose, rowid, name, kana, picture, category, jancode, skucode, unit, price, pricecost, max, min, location, url, note, display)}
              onClose={handleClose}
              items={items}
            />
        </>
    );
}

export default DialogMasterInventory;