import Header from "../../components/header/Header";
import "../../utils/Contents.css";
import "./Login.css";
 
 function Login(){
    return (
      <div className="contentslogin">
        <Header />
        <div className="loging-page">
        <form className="loginform-box">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>ログイン</button>
            <p className="message">Not registered? <a href="/">Create an account</a></p>
        </form>
        </div>
      </div>
    );
  };

  export default Login;