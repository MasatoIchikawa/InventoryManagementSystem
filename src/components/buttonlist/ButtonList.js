import CustomButton from "./button/CustomButton.js";
import "./ButtonList.css";

function ButtonList() {
    const buttons = [
        {
            name: "入庫登録"
        },
        {
            name: "出庫登録"
        }];
    return (
        <section className="buttonsection">
            {buttons.map((item) => <CustomButton props={item} key={item.name} />)}
        </section>
    );
}

export default ButtonList;