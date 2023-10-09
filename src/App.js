import { Routes, Route, } from 'react-router-dom';

import InventoryList from "./pages/inventorylist/InventoryList.js";
import MstInventory from "./pages/master_inventory/MstInventory.js";
import Empty from "./pages/empty/Empty.js";
import InOut from './pages/inout/InOut.js';
import Login from './pages/logins/Login.js';
import MasterAccount from './pages/master_account/MasterAccount.js';

function App(){
    return (
        <main>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/List" element={<InventoryList />} />
                  <Route path="/Inout" element={<InOut />} />
                  <Route path="/MstInventory" element={<MstInventory />} />
                  <Route path="/MasterAccount" element={<MasterAccount />} />
                  <Route path="*" element={<Empty />} />
              </Routes>
        </main>
    );
}

export default App;