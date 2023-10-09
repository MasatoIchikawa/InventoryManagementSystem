import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import "./Header.css";

function Header({title}){
    const navigate = useNavigate();
    const idStore = useSelector((state) => state.account.login_id);
    const passwordStore = useSelector((state) => state.account.login_password);
    const [name, setName] = useState("");

    if(idStore !== "" || passwordStore !== ""){
        console.log(idStore);
        const params = {
            "login_id": idStore,
            "login_password": passwordStore
          };
          const query = new URLSearchParams(params);
          fetch('/login?' + query)
          .then((res) => res.text()).then((json) => {
          const result = JSON.parse(json);
          if(result.length === 1){
            setName("ログイン：" + result[0].user_name);
          }
          else{
            setName("");
            navigate("/");
          }
        });
    }

    return (
        <section className="header">
            <h1>{title}</h1>
            <div className="headerprofile">
                <p>{name}</p>
            </div>
        </section>
    );
}

export default Header;