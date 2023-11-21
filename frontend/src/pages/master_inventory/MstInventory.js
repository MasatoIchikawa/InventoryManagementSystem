import { React, useState } from 'react';

import SideBar from '../../components/sidebar/SideBar.js';
import Header from '../../components/header/Header.js';
import CommonGrid from '../../components/commongrids/CommonGrid.js';
import CommonDelete from '../../components/commondeletes/CommonDelete.js';
import ButtonMasterInventory from './buttons/ButtonMasterInventory.js';
import ButtonEditMasterInventory from './edits/ButtonEditMasterInventory.js';
import "../../utils/Contents.css";

function deletepost(id) {
  const json = {
    inventory_id: id,
  };

  fetch('/mstinventory/delete', {
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

function MstInventory() {
  const [reload, setReload] = useState(new Date());
  const [json, setJson] = useState();

  const rows = [];
  fetch('/mstinventory')
    .then((res) => res.text()).then((data) => {
      setJson(data);
    });
  if (json !== undefined) {
    const result = JSON.parse(json);
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      rows.push({
        id: item.inventory_id,
        name: item.inventory_name,
        kana: item.inventory_kana,
        tag: item.tag,
        jancode: item.jancode,
        skucode: item.skucode,
        unit: item.unit,
        location: item.location,
        note: item.note,
        display: item.display_flag === 1 ? '●' : ''
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
      renderCell: (params) => <ButtonEditMasterInventory rowid={params.id} setReload={setReload} />
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
      field: 'kana',
      headerName: 'フリガナ'
    },
    // {
    //   field: 'picture',
    //   headerName: '画像',
    //   sortable: false,
    //   width: 100,
    //   renderCell: (params) => <MstInventoryPicture blob={ params.value } />
    // },
    {
      field: 'tag',
      headerName: 'タグ'
    },
    {
      field: 'jancode',
      headerName: 'JANコード'
    },
    {
      field: 'skucode',
      headerName: 'SKUコード'
    },
    {
      field: 'unit',
      headerName: '単位'
    },
    {
      field: 'location',
      headerName: '保管場所'
    },
    {
      field: 'note',
      headerName: '説明'
    },
    {
      field: 'display',
      headerName: '表示'
    }];

  return (
    <div className="contents">
      <SideBar />
      <Header title={"在庫マスタ"} />
      <section>
        <ButtonMasterInventory setReload={setReload} />
        <CommonGrid rows={rows} cols={cols} />
      </section>
    </div>
  );
}

export default MstInventory;