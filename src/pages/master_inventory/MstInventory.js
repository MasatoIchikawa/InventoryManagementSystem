import { React, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, jaJP } from '@mui/x-data-grid';

import MstInventoryButton from "./buttons/MstInventoryButton.js";
import MstInventoryDelete from './deletes/MstInventoryDelete.js';
import MstInventoryEdit from './edits/MstInventoryEdit.js';
import MstInventoryPicture from './imgs/MstInventoryPicture.js';
import "./MstInventory.css";

function MstInventory(){
  const [reload, setReload] = useState(new Date());
  const [json, setJson] = useState();

  const rows = [];
    fetch('/mstinventory')
    .then((res) => res.text()).then((data) => {
      setJson(data);
    });
    if(json !== undefined){
      const row2 = JSON.parse(json);
      for(let i = 0; i < row2.length; i++){
        const item = row2[i];
        rows.push({
          id: item.inventory_id,
          name: item.inventory_name,
          kana: item.inventory_kana,
          picture: item.picture,
          category: item.category_id,
          jancode: item.jancode,
          skucode: item.skucode,
          unit_id: item.unit_id,
          price: item.price,
          pricecost: item.price_cost,
          max: item.inventory_max,
          min: item.inventory_min,
          location: item.location,
          url: item.url,
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
        renderCell: (params) => <MstInventoryDelete rowId={params.id} setReload={setReload} />
      },
      {
        field: 'editBtn',
        headerName: '編集',
        sortable: false,
        width: 90,
        disableClickEventBubbling: true,
        renderCell: (params) => <MstInventoryEdit rowId={params.id} setReload={setReload} />
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
      {
        field: 'picture',
        headerName: '画像',
        sortable: false,
        width: 100,
        renderCell: (params) => <MstInventoryPicture blob={ params.value } />
      },
      {
        field: 'category',
        headerName: 'カテゴリ'
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
        field: 'price',
        headerName: '価格'
      },
      {
        field: 'pricecost',
        headerName: '単位原価'
      },
      {
        field: 'max',
        headerName: '最大在庫数'
      },
      {
        field: 'min',
        headerName: '最低在庫数'
      },
      {
        field: 'location',
        headerName: '保管場所'
      },
      {
        field: 'url',
        headerName: 'URL'
      },
      {
        field: 'note',
        headerName: '説明'
      },
      {
        field: 'display',
        headerName: '表示'
      }];
    cols.forEach((a) => {
      a.headerAlign='center';
      a.headerClassName='datagrid-header';
      a.cellClassName='datagrid-cell';
      a.disableColumnMenu=true;
      a.sortable=false;
    });

    return (
        <>
        <MstInventoryButton setReload={setReload} />

        <Box
              sx={{
                height: 'calc(100vh - 190px)',
                width: '100%',
                '& .datagrid-header': {
                  borderBottom: 'solid 1px rgba(224, 224, 224, 1)',
                },
                '.datagrid-header, .datagrid-cell:not(:last-child)': {
                  borderRight: 'solid 1px rgba(224, 224, 224, 1) !important',
                  userSelect:'none',
                },
                '.MuiDataGrid-columnHeaders' : {
                  backgroundColor: '#65b2c6', 
                  color: '#fff',
                }
              }}>
            <DataGrid className='mstinventorygrid'
            rows={rows} 
            columns={cols}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
        </>
    );
}

export default MstInventory;