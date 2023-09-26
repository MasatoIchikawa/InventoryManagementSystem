import { useState } from 'react';

import CommonGrid from "../../components/commongrids/CommonGrid.js";
import InOutButton from "./buttons/InOutButtn.js";
import CommonDelete from '../../components/commondeletes/CommonDelete.js';
import ButtonInputEdit from './buttonimputedits/ButtonInputEdit.js';

function deletepost (id){
  const json = {
    inventory_id: id,
  };

  fetch('/inout/delete', {
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

function formatDate (date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
  return format;
};

function InOut(){
    const [reload, setReload] = useState(new Date());
    const [json, setJson] = useState();

    const rows = [];
      fetch('/inout')
      .then((res) => res.text()).then((data) => {
        setJson(data);
      });
      if(json !== undefined){
        const r = JSON.parse(json);
        for(let i = 0; i < r.length; i++){
          const item = r[i];
          rows.push({
            id: item.inout_id,
            flag: item.inout_flag === 1 ? "入庫" : item.inout_flag === 2 ? "出庫" : "",
            datetime: formatDate(new Date(item.inout_datetime), 'yyyy/MM/dd HH:mm'),
            inventory: item.inventory,
            note: item.note,
            inventoryname: item.inventory_name
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
          renderCell: (params) => <ButtonInputEdit rowId={ params.id } setReload={setReload}  />
        },
        {
            field: 'id',
            headerName: 'ID',
            width: 40,
            align: "center"
        },
        {
            field: 'flag',
            headerName: '入出庫',
            width: 80,
            align: "center"
        },
        {
            field: 'datetime',
            headerName: '入出庫日時',
            width: 160,
            align: "center"
        },
        {
          field: 'inventoryname',
          headerName: '在庫名'
        },
        {
            field: 'inventory',
            headerName: '数量'
        },
        {
            field: 'note',
            headerName: 'コメント'
        }
      ]

    return (
        <>
            <InOutButton setReload={setReload}/>
            <CommonGrid rows={rows} cols={cols} />
        </>
    );
}

export default InOut;