import GridSearch from "../../components/gridsearch/GridSearch.js";
import InventoryListGrid from "./grids/InventoryListGrid.js";
import ButtonList from "../../components/buttonlist/ButtonList.js";

import "./InventoryList.css";

function InventoryList(){
    return (
        <section>
            <ButtonList />
            <GridSearch />
            <InventoryListGrid />
        </section>
    );
}

export default InventoryList;