import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Link to="/">back</Link>
      Login
    </div>
  );
};

Login.propTypes = {};

export default Login;
