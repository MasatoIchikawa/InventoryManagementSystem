import { Link } from "react-router-dom";

import "../SideBar.css";
import "./SideBarIcon.css";

function StockList({ item }){
    return (
        <div className="sideiconwrapper">
            <Link to={item.linkto} className="sidebox">
                <img src={item.icon} className="sideicon" decoding="async"></img>
                <p className="sideicontext">{item.name}</p>
            </Link>
        </div>

    );
}

export default StockList;