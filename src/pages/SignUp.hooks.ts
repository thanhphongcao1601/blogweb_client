import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auths } from "../api/authRequest";

export function useSignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleSignUp() {
    if (!name) {
      return setErrMessage("Name can not null");
    }

    if (!isValidEmail(email)) {
      return setErrMessage("Email not valid");
    }

    if (password.length < 6) {
      return setErrMessage("Password must be at least 6 character");
    }

    Auths.register({ email: email, password: password, name: name })
      .then((response) => {
        if (response.status === "success") {
          navigate("/login", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrMessage("Email must be unique");
      });
  }
  return {
    isValidEmail,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    showPassword,
    setShowPassword,
    errMessage,
    setErrMessage,
    handleSignUp,
  };
}
