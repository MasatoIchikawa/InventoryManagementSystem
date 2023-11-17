import "./Version.css";

function Version(){
    const packageJson = require('../../../../package.json');

    return (
        <div className="version_logo">
            <p>ver{packageJson.version}</p>
        </div>
    );
}

export default Version;