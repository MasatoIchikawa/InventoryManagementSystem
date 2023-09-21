import ButtonInput from "../buttoninputs/ButtonInput.js";
import ButtonOutput from "../buttonoutputs/ButtonOutput.js";
import "./InOutButton.css";

function InOutButton({ setReload }){
    return (
        <section className="buttonsection">
            <ButtonInput setReload={setReload}/>
            <ButtonOutput />
        </section>
    );
}

export default InOutButton;