import { Routes, Route, } from 'react-router-dom';

import SideBar from "./components/sidebar/SideBar.js";
import Header from "./components/header/Header.js";
import StockList from "./pages/stocklist/StockList.js";
import MstInventory from "./pages/master_inventory/MstInventory.js";
import Empty from "./pages/empty/Empty.js";


function App(){
    return (
        <main className="main">
            <SideBar />
            <div className="contents">
              <Header />
              <Routes>
                  <Route path="/" element={<StockList />} />
                  <Route path="/Inout" element={<Empty />} />
                  <Route path="/MstInventory" element={<MstInventory />} />
                  <Route path="/MstCategory" element={<Empty />} />
              </Routes>
            </div>
        </main>
    );
}

export default App;