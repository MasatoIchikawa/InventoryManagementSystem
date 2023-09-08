
import { React, useState, useRef } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";

import "./MstInventoryDialog.css";

function post (onClose, name, kana, pic, category, jan, sku, unit, pri, pricost, max, min, lo, u, n, display){
  const json = {
    inventory_name: name,
    inventory_kana: kana,
    picture: pic,
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
    if(response.status === 200){
      return response.json();
    }
    else{
      console.warm('mstinventory_insertが失敗しました１');
    }
  })
  .then(() => onClose())
  .catch(error => {
    console.error(error);
  })
}

function MstInventoryDialog ({ id, isOpen, onClose }){
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
  // const insert_at = useRef(null);
  // const update_at = useRef(null);
  // const insert_user_id = useRef(null);

  if(isOpen && id !== 0){
    const params = {
        "inventory_id": id,
    };
    const query = new URLSearchParams(params);
    fetch('/mstinventory_edit?' + query)
    .then((res) => res.text()).then((json) => {
        const row2 = JSON.parse(json);
        for(let i = 0; i < row2.length; i++){
          const item = row2[i];
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
    // onClose();
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

  return (
    <>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>在庫マスタ -{id === 0 ? "新規登録" : "編集"}-</DialogTitle>
        <div className="editdialog">
            <label>
                <span className="dialog-label">名称</span>
                <input type="text" className="dialog-textbox" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">フリガナ</span>
                <input type="text" className="dialog-textbox" value={kana} onChange={(e) => setKana(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">カテゴリ</span>
                <label className="dialog-selectbox">
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="0"></option>
                    <option value="1">カテゴリA</option>
                    <option value="2">カテゴリB</option>
                  </select>
                </label>
            </label>

            <div>
              <span className="dialog-label">画像</span>
              <div className="dialog-filelabel">
                <input type="file" accept='image/*' className="dialog-file" id="dialog-file" value={picture ?? ''} onChange={previewImage}/>
                <img id="dialog-preview" src="" width="100" height="100"/>
              </div>
            </div>

            <label>
                <span className="dialog-label">JANコード</span>
                <input type="text" className="dialog-textbox" value={jancode} onChange={(e) => setJancode(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">SKUコード</span>
                <input type="text" className="dialog-textbox" value={skucode} onChange={(e) => setSkucode(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">単位</span>
                <label className="dialog-selectbox">
                  <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="0"></option>
                    <option value="1">個</option>
                    <option value="2">枚</option>
                  </select>
                </label>
            </label>

            <label>
                <span className="dialog-label">価格</span>
                <input type="text" className="dialog-textbox" value={price ?? ''} onChange={(e) => setPrice(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">単位原価</span>
                <input type="text" className="dialog-textbox" value={pricecost ?? ''} onChange={(e) => setPricecost(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">最大在庫数</span>
                <input type="text" className="dialog-textbox" value={max ?? ''} onChange={(e) => setMax(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">最低在庫数</span>
                <input type="text" className="dialog-textbox" value={min ?? ''} onChange={(e) => setMin(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">保管場所</span>
                <input type="text" className="dialog-textbox" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">URL</span>
                <input type="text" className="dialog-textbox" value={url} onChange={(e) => setUrl(e.target.value)}/>
            </label>

            <label>
                <span className="dialog-label">説明</span>
                <input type="text" className="dialog-textbox" value={note} onChange={(e) => setNote(e.target.value)}/>
            </label>

            <div>
              <span className="dialog-label">表示</span>
              <div className="dialog-radio">
                <span>
                  <input id="dialog-displayflag-on" type="radio" checked={display === 1} onChange={() => handleOptionChange(1)}/>
                  <label htmlFor="dialog-displayflag-on">表示する</label>
                </span>
                <span>
                  <input id="dialog-displayflag-off" type="radio" checked={display !== 1} onChange={() => handleOptionChange(0)}/>
                  <label htmlFor="dialog-displayflag-off">表示しない</label>
                </span>
              </div>
            </div>

        </div>

        <Button onClick={() => {post(onClose, name, kana, picture, category, jancode, skucode, unit, price, pricecost, max, min, location, url, note, display)}}>登録</Button>
        <Button onClick={() => onClose()}>閉じる</Button>
      </Dialog>
    </>
  );
};

export default MstInventoryDialog;