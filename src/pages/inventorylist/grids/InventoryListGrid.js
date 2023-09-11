import React from "react";
import { DataGrid, jaJP } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
// import "./Grid.css";

// console.log(fetch('/api'));

// fetch('/api')
// .then((res) => res.json())
// .then((json) => console.log(json.message));

function InventoryListGrid(){
    // const rows = [];
    // fetch('/mstinventory')
    // .then((res) => res.text()).then((data) => {
    //   setJson(data);
    // });
    // if(json !== undefined){
    //   const row2 = JSON.parse(json);
    //   for(let i = 0; i < row2.length; i++){
    //     const item = row2[i];
    //     rows.push({
    //       id: item.inventory_id,
    //       name: item.inventory_name,
    //       kana: item.inventory_kana,
    //       picture: item.picture,
    //       category: item.category_id,
    //       jancode: item.jancode,
    //       skucode: item.skucode,
    //       unit_id: item.unit_id,
    //       price: item.price,
    //       pricecost: item.price_cost,
    //       max: item.inventory_max,
    //       min: item.inventory_min,
    //       location: item.location,
    //       url: item.url,
    //       note: item.note,
    //       display: item.display_flag
    //     });
    //   }
    // }
    
    const rows = [
        { id: 1, name: 'JIN', kana: 'ジン', birth: '1992年12月4日' },
        { id: 2, name: 'SUGA', kana: 'シュガ', birth: '1993年3月9日' },
        { id: 3, name: 'J-HOPE', kana: 'ジェイホープ', birth: '	1994年2月18日' },
        { id: 4, name: 'RM', kana: 'アールエム', birth: '1994年9月12日' },
        { id: 5, name: 'JIMIN', kana: 'ジミン', birth: '1995年10月13日' },
        { id: 6, name: 'V', kana: 'ヴィ', birth: '1995年12月30日' },
        { id: 7, name: 'JUNG KOOK', kana: 'ジョングク', birth: '1997年9月1日' }
      ]

    const cols = [
        {
          field: 'name',
          headerName: '英字'
        },
        {
          field: 'kana',
          headerName: '仮名'
        },
        {
          field: 'birth',
          headerName: '生年月日'
        }
      ]

    const text = jaJP.components.MuiDataGrid.defaultProps.localeText;
    return (
        <section className='stocklistgrid'>
            <DataGrid 
            rows={rows} 
            columns={cols} 
            localeText={text}
            />
        </section>
    );
}

export default InventoryListGrid;