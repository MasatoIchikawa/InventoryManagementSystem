import SidebarIcon from "./sidebaricon/SideBarIcon.js";
import "./SideBar.css";

import { useSelector, useDispatch } from "react-redux";
import { stocklist, inout, master_inventory, master_category } from "../../libs/redux/FormSlice.js";

import svg_stocklist from "./icon/stocklist.svg";
import svg_stockrecord from "./icon/stockrecord.svg";
import svg_inventory from "./icon/inventory.svg";
import svg_analysis from "./icon/analysis.svg";
import svg_master from "./icon/master.svg";

function SideBar() {
    // const dispatch = useDispatch();
    // const click = () => dispatch(stocklist());


    const icons = [
        {
            name : "在庫管理表",
            icon: svg_stocklist,
            linkto: "/",
        },
        {
            name : "入出庫記録",
            icon: svg_stockrecord,
            linkto: "/Inout",
        },
        {
            name: "在庫マスタ",
            icon: svg_master,
            linkto: "/MstInventory",
        },
        {
            name: "カテゴリーマスタ",
            icon: svg_master,
            linkto: "/MstCategory",
        },
    ];

    return (
        <aside className="side">
            <ul className="structure">
                {icons.map((item) => <SidebarIcon item={item} key={item.name}/>)}
            </ul>
        </aside>
    );
}

export default SideBar;