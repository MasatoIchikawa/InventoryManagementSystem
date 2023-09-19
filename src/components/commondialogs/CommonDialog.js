
import { React, useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ja from "date-fns/locale/ja";

import "./CommonDialog.css";

// function post (onClose, id, name, kana, pic, category, jan, sku, unit, pri, pricost, max, min, lo, u, n, display){
//   const json = {
//     inventory_id: id,
//     inventory_name: name,
//     inventory_kana: kana,
//     picture: pic,
//     category_id: category,
//     jancode: jan,
//     skucode: sku,
//     unit_id: unit,
//     price: pri,
//     price_cost: pricost,
//     inventory_max: max,
//     inventory_min: min,
//     location: lo,
//     url: u,
//     note: n,
//     display_flag: display,
//     insert_user_id: 0
//   };

//   fetch('/mstinventory_insert', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(json)
//   })
//   .then(response => {
//     if(response.status !== 200){
//       console.warm('mstinventory_insertが失敗しました');
//     }
//     onClose();
//   })
//   .catch(error => {
//     console.error(error);
//   })
// }

function CommonDialog ({ title, isOpen, onSave, onClose, items }){
//   const handleClose = () => {
//     setID(0);
//     onClose();
//   };

//   const handleOptionChange = (display) => {
//     setDisplay(display);
//   };

//   const previewImage = (obj) => {
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
//   }

  const setItem = (props) => {
    switch(props.type){
        case "text":
            return (
            <label key={props.name}>
                <span className="dialog-label">{props.name}</span>
                <TextField
                    className="dialog-textbox"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    value={props.value ?? ''}
                    onChange={(e) => props.onchange(e.target.value)
                    }
                />
            </label>
            );
        case "number":
              return (
                <label key={props.name}>
                  <span className="dialog-label">{props.name}</span>
                  <TextField
                    className="dialog-numberbox"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    value={props.value ?? ''}
                    onChange={(e) => props.onchange(e.target.value)
                    }
                  />
                </label>
              );
        case "select":
            return(
            <label key={props.name}>
                <span className="dialog-label">{props.name}</span>
                <label className="dialog-selectbox">
                  <select value={props.value ?? 0} onChange={(e) => props.onchange(e.target.value)}>
                  <option value="0"></option>
                    {props.selecter.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}
                  </select>
                </label>
            </label>
            );
        case "radio":
            return (
                <div key={props.name}>
                    <span className="dialog-label">{props.name}</span>
                    <div className="dialog-radio">
                        <span>
                            <input id="dialog-displayflag-on" type="radio" checked={props.value === 1} onChange={() => props.onchange(1)}/>
                            <label htmlFor="dialog-displayflag-on">表示する</label>
                        </span>
                        <span>
                             <input id="dialog-displayflag-off" type="radio" checked={props.value !== 1} onChange={() => props.onchange(0)}/>
                            <label htmlFor="dialog-displayflag-off">表示しない</label>
                         </span>
                    </div>
              </div>
            );
        case "date":
            return (
                <div key={props.name}>
                  <span className="dialog-label">{props.name}</span>
                  <LocalizationProvider
                    adapterLocale={ja}
                    dateAdapter={AdapterDateFns}
                    dateFormats={{ monthAndYear: "yyyy年 MM月 " }}
                  >
                    <DateTimePicker value={props.value ?? null} onchange={props.onChange}/>
                  </LocalizationProvider>
                </div>
            );
        case "file":
            return(
                <div key={props.name}>
                    <span className="dialog-label">{props.name}</span>
                    <div className="dialog-filelabel">
                        <input type="file" accept='image/*' className="dialog-file" id="dialog-file" value={props.value ?? ''} onchange={props.onChange}/>
                        <img id="dialog-preview" src="" width="100" height="100"/>
                    </div>
                </div>
            );
    }
  }

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>{title}</DialogTitle>
        <div className="editdialog">
            {items.map((a) => setItem(a))}
        </div>
        <Button onClick={onSave}>登録</Button>
        <Button onClick={onClose}>閉じる</Button>
      </Dialog>
    </>
  );
};

export default CommonDialog;