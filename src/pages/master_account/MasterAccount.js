import { useState } from "react";

import CommonGrid from "../../components/commongrids/CommonGrid";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import ButtonMasterAccount from "./buttons/ButtonMasterAccount";
import ButtonEditMasterAccount from "./buttonedits/ButtonEditMasterAccount";
import CommonDelete from "../../components/commondeletes/CommonDelete";
import "./MasterAccount.css";

function deletepost (id){
  const json = {
    user_id: id,
  };

  fetch('/master/account/delete', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json)
  })
  .then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      console.warn('Something went wrong on api server!');
    }
  })
  .catch(error => {
    console.error(error);
  })
}

function MasterAccount(){
    const [reload, setReload] = useState(new Date());
    const [json, setJson] = useState();
  
    const rows = [];
      fetch('/master/account')
      .then((res) => res.text()).then((data) => {
        setJson(data);
      });
      if(json !== undefined){
        const result = JSON.parse(json);
        for(let i = 0; i < result.length; i++){
          const item = result[i];
          rows.push({
            id: item.user_id,
            name: item.user_name,
            login: item.login_id,
            authority: item.authority_level === 1 ? "一般" : item.authority_level === 2 ? "管理者" : "",
          });
        }
      }
  
      const cols = [
        {
          field: 'deleteBtn',
          headerName: '削除',
          sortable: false,
          width: 90,
          disableClickEventBubbling: true,
          renderCell: (params) => <CommonDelete rowId={params.id} setReload={setReload} deletepost={() => deletepost(params.id)} />
        },
        {
          field: 'editBtn',
          headerName: '編集',
          sortable: false,
          width: 90,
          disableClickEventBubbling: true,
          renderCell: (params) => <ButtonEditMasterAccount rowId={params.id} setReload={setReload} />
        },
        {
          field: 'id',
          headerName: 'ID',
        },
        {
          field: 'name',
          headerName: '名前'
        },
        {
          field: 'login',
          headerName: 'ユーザーID'
        },
        {
          field: 'authority',
          headerName: '権限レベル'
        }];

    return (
        <div className="contents">
          <SideBar />
          <Header title={"ユーザーマスタ"}/>
          <section>
            <ButtonMasterAccount setReload={setReload} />
            <CommonGrid rows={rows} cols={cols} />
          </section>
        </div>
    );
}

export default MasterAccount;