import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

function Header({ title, id, password }) {
  const CryptoJS = require("crypto-js");
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const login_id = localStorage.getItem("login_id");
  const login_password = localStorage.getItem("login_password");

  useLayoutEffect(() => {
    const params = {
      "login_id": id !== undefined ? id : login_id,
      "login_password": password !== undefined ?  CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex) : login_password
    };

    const query = new URLSearchParams(params);
    fetch('/login?' + query)
      .then((res) => res.text()).then((json) => {
        const result = JSON.parse(json);
        if (result.length === 1) {
          localStorage.setItem("login_id", result[0].login_id);
          localStorage.setItem("login_password", result[0].login_password);
          localStorage.setItem("administrator", result[0].administrator);
          setName("ログイン：" + result[0].user_name);
        }
        else {
          localStorage.setItem("login_id", "");
          localStorage.setItem("login_password", "");
          localStorage.setItem("administrator", 0);
          setName("");
          navigate("/");
        }
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