import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

function Header({title, id, password}){
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const login_id = localStorage.getItem("login_id");
    const login_password = localStorage.getItem("login_password");
    
    useLayoutEffect(() => {
      const params = {
          "login_id": id !== undefined ? id : login_id,
          "login_password": password !== undefined ? password : login_password
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

        localStorage.setItem("login_id", params.login_id);
        localStorage.setItem("login_password", params.login_password);
      });
    }, []);


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