import { useState } from "react";

import InOutButton from "../inout/buttons/InOutButtn.js";
import GridSearch from "../../components/gridsearch/GridSearch.js";
import CommonGrid from "../../components/commongrids/CommonGrid.js";
import "./InventoryList.css";

function InventoryList(){
    const [reload, setReload] = useState(new Date());
    const [json, setJson] = useState();
  
    const rows = [];
      fetch('/inventorylist')
      .then((res) => res.text()).then((data) => {
        setJson(data);
      });
      if(json !== undefined){
        const r = JSON.parse(json);
        for(let i = 0; i < r.length; i++){
          const item = r[i];
          rows.push({
            id: item.inventory_id, 
            picture: item.picture, 
            category_name: item.category_name, 
            inventory_name: item.inventory_name, 
            inventory_kana: item.inventory_kana, 
            number: item.number, 
            unit_name: item.unit_name, 
            jancode: item.jancode, 
            skucode: item.skucode, 
            price: item.price, 
            location: item.location, 
            note: item.note
          });
        }
      }
  
      const cols = [
        {
            field: 'id',
            headerName: 'ID',
            width: 40,
            align: "center"
        },
        {
            field: 'picture',
            headerName: '画像',
            width: 80,
            align: "center"
        },
        {
            field: 'category_name',
            headerName: 'カテゴリ',
            width: 160,
            align: "center"
        },
        {
          field: 'inventory_name',
          headerName: '名前'
        },
        {
            field: 'inventory_kana',
            headerName: 'カナ'
        },
        {
            field: 'number',
            headerName: '数量'
        },
        {
          field: 'unit_name',
          headerName: '単位'
        },
        {
          field: 'jancode',
          headerName: '商品識別コード'
        },
        {
          field: 'skucode',
          headerName: '商品番号'
        },
        {
          field: 'price',
          headerName: '価格'
        },
        {
          field: 'location',
          headerName: '保管場所'
        },
        {
          field: 'note',
          headerName: '説明'
        },
      ]

    return (
        <section>
            <InOutButton setReload={setReload}/>
            <GridSearch />
            <CommonGrid rows={rows} cols={cols} />
        </section>
    );
}

export default InventoryList;