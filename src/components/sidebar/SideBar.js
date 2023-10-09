import SidebarIcon from "./sidebaricon/SideBarIcon.js";
import svg_stocklist from "./icon/stocklist.svg";
import svg_stockrecord from "./icon/stockrecord.svg";
import svg_inventory from "./icon/inventory.svg";
import svg_analysis from "./icon/analysis.svg";
import svg_master from "./icon/master.svg";
import svg_logout from "./icon/logout.svg";
import "./SideBar.css";

function SideBar() {
    const icons = [
        {
            name : "在庫管理表",
            icon: svg_stocklist,
            linkto: "/List",
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
        {
            name: "ユーザーマスタ",
            icon: svg_master,
            linkto: "/MasterAccount",

        },
    ];

    const undericon = {
        name : "ログアウト",
        icon: svg_logout,
        linkto: "/",
    };

    return (
        <aside className="side">
            <ul className="structure">
                {icons.map((item) => <SidebarIcon item={item} key={item.name}/>)}
            </ul>
            <ul className="structureunder">
                <SidebarIcon item={undericon} key={undericon.name}/>
            </ul>
        </aside>
    );
}

export default SideBar;