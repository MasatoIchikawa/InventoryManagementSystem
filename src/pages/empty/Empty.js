import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import "../../utils/Contents.css";

function Empty(){
    return (
        <div className="contents">
            <SideBar />
            <Header title={"在庫管理システム"}/>
            <p>ページが存在しません。</p>
        </div>
    );
}

export default Empty;