import { useState } from 'react';

import CommonGrid from "../../components/commongrids/CommonGrid.js";
import InOutButton from "./buttons/InOutButtn.js";

function InOut(){
    const [json, setJson] = useState();

    const rows = [];
      fetch('/inout')
      .then((res) => res.text()).then((data) => {
        setJson(data);
      });
      if(json !== undefined){
        const row2 = JSON.parse(json);
        for(let i = 0; i < row2.length; i++){
          const item = row2[i];
          rows.push({
            id: item.inout_id,
            flag: item.inout_flag,
            datetime: item.inout_datetime,
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
          // renderCell: (params) => <MstInventoryDelete rowId={ params.id } />
        },
        {
          field: 'editBtn',
          headerName: '編集',
          sortable: false,
          width: 90,
          disableClickEventBubbling: true,
          // renderCell: (params) => <MstInventoryEdit rowId={ params.id } />
        },
        {
            field: 'id',
            headerName: 'ID'
        },
        {
            field: 'flag',
            headerName: '入出庫'
        },
        {
            field: 'datetime',
            headerName: '入出庫日時'
        },
        {
            field: 'inventory',
            headerName: '数量'
        },
        {
            field: 'note',
            headerName: 'コメント'
        },
        {
            field: 'inventoryname',
            headerName: '在庫名'
        }]

    return (
        <>
            <InOutButton />
            <CommonGrid rows={rows} cols={cols} />
        </>
    );
}

export default InOut;