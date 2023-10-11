import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login_id, login_password } from "../../libs/redux/AccountSlice.js";

import "./Header.css";

function Header({title, id, password}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const idSlice = (value) => dispatch(login_id(value));
    const passwordSlice = (value) => dispatch(login_password(value));
    const idStore = useSelector((state) => state.account.login_id);
    const passwordStore = useSelector((state) => state.account.login_password);
    const [name, setName] = useState("");

    useLayoutEffect(() => {

      const params = {
          "login_id": id !== undefined ? id : idStore,
          "login_password": password !== undefined ? password : passwordStore
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

        idSlice(params.login_id);
        passwordSlice(params.login_password);
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