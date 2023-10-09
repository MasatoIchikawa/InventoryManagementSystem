import "./Header.css";

function Header({title}){
    return (
        <section className="header">
            <h1>{title}</h1>
        </section>
    );
}

export default Header;