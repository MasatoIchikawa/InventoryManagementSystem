import GridSearch from "../../components/gridsearch/GridSearch.js";
import Grid from "../../components/grid/Grid";
import ButtonList from "../../components/buttonlist/ButtonList";

import "./StockList.css";

function StockList(){
    return (
        <section>
            <ButtonList />
            <GridSearch />
            <Grid />
        </section>
    );
}

export default StockList;