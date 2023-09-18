import ButtonInput from "../buttoninputs/ButtonInput.js";
import ButtonOutput from "../buttonoutputs/ButtonOutput.js";
import "./InOutButton.css";

function InOutButton(){
    return (
        <section className="buttonsection">
            <ButtonInput />
            <ButtonOutput />
        </section>
    );
}

export default InOutButton;