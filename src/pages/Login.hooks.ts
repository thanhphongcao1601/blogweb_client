import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auths } from "../api/authRequest";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  let navigate = useNavigate();
  function handleLogin() {
    Auths.login({ email: email, password: password })
      .then((response) => {
        if (response.status === "success") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", response.data.userName);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("avatarLink", response.data.avatarLink);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        setErrMessage("Username and password is not valid!");
      });
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    errMessage,
    setErrMessage,
    handleLogin,
  };
}
