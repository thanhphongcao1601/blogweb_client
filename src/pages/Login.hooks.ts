import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auths } from "../api/authRequest";
import { useStore } from "../zustand/store";
import { User } from "../models/User";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useStore();
  const navigate = useNavigate();

  function handleLogin() {
    setIsLoading(true);

    setTimeout(() => {
      Auths.login({ email: email, password: password })
        .then((response) => {
          if (response.status === "success") {
            setIsLoading(false);
            const data = response.data;

            localStorage.clear();

            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("email", data.email);
            localStorage.setItem("avatarLink", data.avatarLink);

            var loggedInUser: User = {
              userName: data.userName,
              userId: data.userId,
              token: data.token,
              email: data.email,
              avatarLink: data.avatarLink,
            };

            setCurrentUser(loggedInUser);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setErrMessage("Username and password is not valid!");
        });
    }, 1000);
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    errMessage,
    setErrMessage,
    handleLogin,
    isLoading,
    setIsLoading,
  };
}
