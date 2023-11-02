import { useState } from "react";

import CommonDialog from "../../../components/commondialogs/CommonDialog.js";

function save (onClose, id, name, login_id, login_password, administrator, displayflag, displayno){
    const json = {
      user_id: id,        
      user_name: name,
      login_id: login_id,
      login_password: login_password,
      administrator: administrator,
      display_flag: displayflag,
      display_no: displayno,
      insert_user_id: 0,
    };
  
    fetch('/master/account/insert', {
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

function DialogMasterAccount({ open, setOpen, setReload, rowId }){
    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [loginid, setLoginID] = useState("");
    const [loginpassword, setPassword] = useState("");
    const [administrator, setAdministrator] = useState(1);
    const [displayflag, setDisplayflag] = useState(1);
    const [displayno, setDisplayno] = useState(1);
    if(!open) return;

    if(rowId !== 0 && rowId !== id){
        const params = {
            "user_id": rowId,
        };
        const query = new URLSearchParams(params);
        fetch('/master/account/edit?' + query)
        .then((res) => res.text()).then((json) => {
            const result = JSON.parse(json);
            if(result.length === 1){
              const row = result[0];
              setID(row.user_id);
              setName(row.user_name);
              setLoginID(row.login_id);
              setPassword(row.login_password);
              setAdministrator(row.administrator);
              setDisplayflag(row.display_flag);
              setDisplayno(row.display_no);
            }
        });
      }

    const handleClose = () => {
        setOpen(false);
        setReload(new Date());
    };
  
    const items = [
        {
            type: "text",
            key: "user_name",
            name: "ユーザー名",
            Required: true,
            value: name,
            onchange: setName
        },
        {
            type: "text",
            key: "login_id",
            name: "ユーザーID",
            Required: true,
            value: loginid,
            onchange: setLoginID,
        },
        {
            type: "text",
            key: "login_password",
            name: "パスワード",
            Required: true,
            value: loginpassword,
            onchange: setPassword,
        },
        {
            type: "radio",
            key: "administrator",
            name: "権限レベル",
            Required: true,
            value: administrator,
            onchange: setAdministrator,
            selecter: [
              {
                id: 0,
                name: "一般",
              },
              {
                id: 1,
                name: "管理者",
              }]
        },
        {
          type: "radio",
          key: "displayno",
          name: "表示",
          Required: true,
          value: displayflag,
          onchange: setDisplayflag,
          selecter: [
            {
              id: 1,
              name: "表示する",
            },
            {
              id: 0,
              name: "表示しない",
            }]
      }
      ]

    return (
        <>
            <CommonDialog 
              title={"ユーザーマスタ " + (rowId > 0 ? "-編集-" : "-新規追加-")}
              isOpen={open}
              onSave={() => save(handleClose, rowId, name, loginid, loginpassword, administrator, displayflag, displayno)}
              onClose={handleClose}
              items={items}
            />
        </>
    );
}

export default DialogMasterAccount;