import { Routes, Route, } from 'react-router-dom';

import SideBar from "./components/sidebar/SideBar.js";
import Header from "./components/header/Header.js";
import InventoryList from "./pages/inventorylist/InventoryList.js";
import MstInventory from "./pages/master_inventory/MstInventory.js";
import Empty from "./pages/empty/Empty.js";
import InOut from './pages/inout/InOut.js';
import Login from './pages/logins/Login.js';

function App(){
    return (
        <main className="main">
            <SideBar />
            <div className="contents">
              <Header />
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/List" element={<InventoryList />} />
                  <Route path="/Inout" element={<InOut />} />
                  <Route path="/MstInventory" element={<MstInventory />} />
                  <Route path="/MstCategory" element={<Empty />} />
              </Routes>
            </div>
        </main>
    );
}

export default App;