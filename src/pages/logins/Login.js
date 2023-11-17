import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


import Header from "../../components/header/Header";
import Version from "./version/Version";
import "./Login.css";

function Login(){
  const navigate = useNavigate();

  const [id, setID] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState(false);

  const refPassword = useRef();

  const setHalfOnly = (value, set) => {
    if(!value.match(/^[A-Za-z0-9]*$/)){
      return;
    }
    set(value)
  }

  const idPressEnter = (e) => {
    if(e.key !== "Enter") return;
    refPassword.current.focus();
  }

  const passwordPressEnter = (e) => {
    if(e.key !== "Enter") return;
    handlelogin();
  }
  
  const handlelogin = () => {
    const params = {
      "login_id": id,
      "login_password": password
    };
    const query = new URLSearchParams(params);
    fetch('/login?' + query)
    .then((res) => res.text()).then((json) => {
    const result = JSON.parse(json);
    if(result.length === 1){
      setError(false);
      localStorage.setItem('login_id', result[0].login_id);
      localStorage.setItem('login_password', result[0].login_password);

      navigate("/List");
    }
    else{
      setError(true);
      localStorage.setItem('login_id', '');
      localStorage.setItem('login_password', '');
    }
  });
  }
    return (
      <div className="contentslogin">
        <Header title={"在庫管理システム"} id={""} password={""} />
        <div className="loging-page">
          <div className="loginform-box">
            <input type="text" placeholder="ユーザーID" value={id} onChange={(e) => setHalfOnly(e.target.value, setID)} onKeyDown={(e) => idPressEnter(e)}/>
            <input type="password" ref={refPassword} placeholder="パスワード" value={password} onChange={(e) => setHalfOnly(e.target.value, setPassowrd)} onKeyDown={passwordPressEnter}/>
            <button onClick={handlelogin}>ログイン</button>
            <p className={error ? "login-errormessege" : "messagehide"}>ユーザーIDまたはパスワードが違います。</p>
          </div>
        </div>
        <Version />
      </div>
    );
};

export default Login;