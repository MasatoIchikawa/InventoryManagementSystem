
import { React, useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ja from "date-fns/locale/ja";

import "./CommonDialog.css";

function CommonDialog ({ title, isOpen, onSave, onClose, items }){
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
                      {props.selecter.map((a) => (
                        <span key={"dialog-radio-" + a.id}>
                            <input id={"dialog-radio-" + a.id} type="radio" checked={a.id === props.value} name={props.name} onChange={() => props.onchange(a.id)}/>
                            <label htmlFor={"dialog-radio-" + a.id}>{a.name}</label>
                        </span>
                      ))}
                        {/* <span>
                            <input id="dialog-displayflag-on" type="radio" checked={props.value === 1} onChange={() => props.onchange(1)}/>
                            <label htmlFor="dialog-displayflag-on">表示する</label>
                        </span>
                        <span>
                             <input id="dialog-displayflag-off" type="radio" checked={props.value !== 1} onChange={() => props.onchange(0)}/>
                            <label htmlFor="dialog-displayflag-off">表示しない</label>
                         </span> */}
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
                    <DateTimePicker value={props.value === null ? null : new Date(props.value)} onChange={(date) => {

                      props.onchange(date.toLocaleString('ja-JP'))
                    }}/>
                  </LocalizationProvider>
                </div>
            );
        case "file":
            return(
                <div key={props.name}>
                    <span className="dialog-label">{props.name}</span>
                    <div className="dialog-filelabel">
                        <input
                          type="file" accept='image/*' className="dialog-file" id="dialog-file" value={props.value ?? ''} onChange={props.onchange}/>
                        <img id="dialog-preview" src="" width="100" height="100"/>
                    </div>
                </div>
            );
    }
  }



  const savecheck = () => {
    let errors = [];
    items.forEach(props => {
      if(!props.Required) return;
      switch(props.type){
        case "date":
          console.log(props);
          if(props.value === null){
            errors.push(props.name + ' is null');
            return;
          }
      }
    });
    if(errors.length > 0){
      console.log(errors.map((e) => e + '\n'));
      return;
    }
    console.log('onsave');
    onSave();
  }


  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>{title}</DialogTitle>
        <div className="editdialog">
            {items.map((a) => setItem(a))}
        </div>
        <Button onClick={savecheck}>登録</Button>
        <Button onClick={onClose}>閉じる</Button>
      </Dialog>
    </>
  );
};

export default CommonDialog;