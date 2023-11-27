import { useState } from "react";

import InOutButton from "../inout/buttons/InOutButtn.js";
import GridSearch from "../../components/gridsearch/GridSearch.js";
import CommonGrid from "../../components/commongrids/CommonGrid.js";
import SideBar from "../../components/sidebar/SideBar.js";
import Header from "../../components/header/Header.js";
import "../../utils/Contents.css";

function InventoryList() {
  const [reload, setReload] = useState(new Date());
  const [json, setJson] = useState();

  const rows = [];
  fetch('/inventorylist')
    .then((res) => res.text()).then((data) => {
      setJson(data);
    });
  if (json !== undefined) {
    const r = JSON.parse(json);
    for (let i = 0; i < r.length; i++) {
      const item = r[i];
      rows.push({
        id: item.inventory_id,
        picture: item.picture,
        category_name: item.category_name,
        inventory_name: item.inventory_name,
        inventory_kana: item.inventory_kana,
        number: item.number + item.unit,
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
      field: 'inventory_name',
      headerName: '名前',
      width: 180,
    },
    {
      field: 'inventory_kana',
      headerName: 'カナ',
      width: 160,
    },
    {
      field: 'number',
      headerName: '数量'
    },
    {
      field: 'jancode',
      headerName: 'JANコード',
      width: 120,
    },
    {
      field: 'skucode',
      headerName: 'SKUコード',
      width: 120,
    },
    {
      field: 'location',
      headerName: '保管場所',
      width: 120,
    },
    {
      field: 'note',
      headerName: '説明',
      width: 200,
    },
  ]

  return (
    <div className="contents">
      <SideBar />
      <Header title={"在庫管理表"} />
      <section>
        <InOutButton setReload={setReload} />
        {/* <GridSearch /> */}
        <CommonGrid rows={rows} cols={cols} />
      </section>
    </div>
  );
}

export default InventoryList;