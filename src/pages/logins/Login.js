import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login_id, login_password } from "../../libs/redux/AccountSlice.js";

import Header from "../../components/header/Header";
import "../../utils/Contents.css";
import "./Login.css";

function Login(){
  const navigate = useNavigate();

  const [id, setID] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState(false);

  const refPassword = useRef();

  const idStore = useSelector((state) => state.account.login_id);
  const passwordStore = useSelector((state) => state.account.login_password);
  const dispatch = useDispatch();
  const idSlice = (value) => dispatch(login_id(value));
  const passwordSlice = (value) => dispatch(login_password(value));

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
      idSlice(result[0].login_id);
      passwordSlice(result[0].login_password);
      navigate("/List");
    }
    else{
      setError(true);
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
      </div>
    );
};

export default Login;