import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const Login = () => (
  <div>
    <div className="login-content">
      <h3>Kirjautuminen</h3>
      <LoginForm />
    </div>
    <div className="login-footer">
      <Link to="/register">
        <button className="btn__bs btn__register">Rekisteröidy</button>
      </Link>
    </div>
  </div>
);

export default Login;
