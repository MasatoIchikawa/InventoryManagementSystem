
import { React, useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ja from "date-fns/locale/ja";

import "./CommonDialog.css";

function CommonDialog({ title, isOpen, onSave, onClose, items }) {
  const setItem = (props) => {
    switch (props.type) {
      case "text":
        return (
          <label key={props.name}>
            <div className="dialog-label">
              <span>{props.name}</span>
              <span className="dialog-required">&nbsp;&nbsp;{props.Required ? "※必須" : ""}</span>
            </div>
            <TextField
              className="dialog-textbox"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              disabled={props.disabled}
              value={props.value ?? ''}
              onChange={(e) => props.onchange(e.target.value)
              }
            />
          </label>
        );
      case "number":
        return (
          <label key={props.name}>
            <div className="dialog-label">
              <span>{props.name}</span>
              <span className="dialog-required">&nbsp;&nbsp;{props.Required ? "※必須" : ""}</span>
            </div>
            <TextField
              className="dialog-numberbox"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              disabled={props.disabled}
              value={props.value ?? ''}
              onChange={(e) => props.onchange(e.target.value)
              }
            />
          </label>
        );
      case "select":
        return (
          <label key={props.name}>
            <div className="dialog-label">
              <span>{props.name}</span>
              <span className="dialog-required">&nbsp;&nbsp;{props.Required ? "※必須" : ""}</span>
            </div>
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
            <div className="dialog-label">
              <span>{props.name}</span>
              <span className="dialog-required">&nbsp;&nbsp;{props.Required ? "※必須" : ""}</span>
            </div>
            <div className="dialog-radio">
              {props.selecter.map((a) => (
                <span key={"dialog-radio-" + a.id}>
                  <input id={"dialog-radio-" + a.id} type="radio" disabled={props.disabled} checked={a.id === props.value} name={props.name} onChange={() => props.onchange(a.id)} />
                  <label htmlFor={"dialog-radio-" + a.id}>{a.name}</label>
                </span>
              ))}
            </div>
          </div>
        );
      case "date":
        return (
          <div key={props.name}>
            <div className="dialog-label">
              <span>{props.name}</span>
              <span className="dialog-required">&nbsp;&nbsp;{props.Required ? "※必須" : ""}</span>
            </div>
            <LocalizationProvider
              adapterLocale={ja}
              dateAdapter={AdapterDateFns}
              dateFormats={{ monthAndYear: "yyyy年 MM月 " }}
            >
              <DateTimePicker disabled={props.disabled} value={props.value === null ? null : new Date(props.value)} onChange={(date) => {

                props.onchange(date.toLocaleString('ja-JP'))
              }} />
            </LocalizationProvider>
          </div>
        );
      case "file":
        return (
          <div key={props.name}>
            <div className="dialog-label">
              <span>{props.name}</span>
              <span className="dialog-required">&nbsp;&nbsp;{props.Required ? "※必須" : ""}</span>
            </div>
            <div className="dialog-filelabel">
              <input
                type="file" accept='image/*' className="dialog-file" id="dialog-file" disabled={props.disabled} value={props.value ?? ''} onChange={props.onchange} />
              <img id="dialog-preview" src="" width="100" height="100" />
            </div>
          </div>
        );
    }
  }

  const savecheck = () => {
    let errors = [];
    items.forEach(props => {
      if (!props.Required) return;
      if (props.value === null || props.value === "") {
        errors.push(props.name + 'が未入力です');
        return;
      }
      switch (props.type) {
        case "number":
        case "select":
          if (props.value === "0") {
            errors.push(props.name + 'が未入力です');
            return;
          }
      }
    });
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    onSave();
    onClose();
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