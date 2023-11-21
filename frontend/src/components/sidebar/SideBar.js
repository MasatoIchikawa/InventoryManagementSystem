import { useState } from "react";

import SidebarIcon from "./sidebaricon/SideBarIcon.js";
import svg_stocklist from "./icon/stocklist.svg";
import svg_stockrecord from "./icon/stockrecord.svg";
import svg_master from "./icon/master.svg";
import svg_logout from "./icon/logout.svg";
import "./SideBar.css";

function SideBar() {

    const [isOpen, setIsOpen] = useState(false);

    const icons = [
        {
            name: "在庫管理表",
            icon: svg_stocklist,
            linkto: "/List",
        },
        {
            name: "入出庫記録",
            icon: svg_stockrecord,
            linkto: "/Inout",
        },
    ];

    const administrator = localStorage.getItem("administrator");
    if (administrator == 1) {
        icons.push(
            {
                name: "在庫マスタ",
                icon: svg_master,
                linkto: "/MstInventory",
            },
            {
                name: "ユーザーマスタ",
                icon: svg_master,
                linkto: "/MasterAccount",
            })
    }

    const undericon = {
        name: "ログアウト",
        icon: svg_logout,
        linkto: "/",
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="side-hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <aside className={isOpen ? "side side-open" : "side side-close"}>
                <ul className="structure">
                    {icons.map((item) => <SidebarIcon item={item} key={item.name} />)}
                </ul>
                <ul className="structureunder">
                    <SidebarIcon item={undericon} key={undericon.name} />
                </ul>
            </aside>
        </>

    );
}

export default SideBar;