import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auths } from "../api/authRequest";

export function useSignUp(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState("");
  
    function handleSignUp() {
    Auths.register({ email: email, password: password, name: name })
    .then((response) => {
      if (response.status === "success") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.userName);

        navigate("/", { replace: true });
      }
    })
    .catch((error) => {
      console.log(error);
      setErrMessage(
        "Email must be unique and password be at least 6 character"
      );
    });
}
    return {email, setEmail, password, setPassword, name, setName, showPassword, setShowPassword, errMessage, setErrMessage, handleSignUp}
}