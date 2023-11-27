import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";
import Version from "./version/Version";
import "./Login.css";

async function digestMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return hash;
}

function Login() {
  const CryptoJS = require("crypto-js");
  const navigate = useNavigate();

  const [id, setID] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState(false);

  const refPassword = useRef();

  const setHalfOnly = (value, set) => {
    if (!value.match(/^[A-Za-z0-9]*$/)) {
      return;
    }
    set(value)
  }

  const idPressEnter = (e) => {
    if (e.key !== "Enter") return;
    refPassword.current.focus();
  }

  const passwordPressEnter = (e) => {
    if (e.key !== "Enter") return;
    handlelogin();
  }

  const handlelogin = () => {
    const params = {
      "login_id": id,
      "login_password": CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
    };
    const query = new URLSearchParams(params);
    fetch('/login?' + query)
      .then((res) => res.text()).then((json) => {
        const result = JSON.parse(json);
        if (result.length === 1) {
          localStorage.setItem('login_id', result[0].login_id);
          localStorage.setItem('login_password', result[0].login_password);
          localStorage.setItem('administrator', result[0].administrator);
          setError(false);
          navigate("/List");
        }
        else {
          localStorage.setItem('login_id', '');
          localStorage.setItem('login_password', '');
          localStorage.setItem('administrator', 0);
          setError(true);
        }
      });
  }
  return (
    <div className="contentslogin">
      <Header title={"在庫管理システム"} id={""} password={""} />
      <div className="loging-page">
        <div className="loginform-box">
          <input type="text" placeholder="ユーザーID" value={id} onChange={(e) => setHalfOnly(e.target.value, setID)} onKeyDown={(e) => idPressEnter(e)} />
          <input type="password" ref={refPassword} placeholder="パスワード" value={password} onChange={(e) => setHalfOnly(e.target.value, setPassowrd)} onKeyDown={passwordPressEnter} />
          <button onClick={handlelogin}>ログイン</button>
          <p className={error ? "login-errormessege" : "messagehide"}>ユーザーIDまたはパスワードが違います。</p>
        </div>
      </div>
      <Version />
    </div>
  );
};

export default Login;