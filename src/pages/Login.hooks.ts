import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auths } from "../api/authRequest";
import { User } from "../models/User";
import { useProfileStore } from "../zustand/ProfileStore";
import { useStorage } from "../zustand/zustandStorage";

export function useLogin() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useProfileStore();
  const navigate = useNavigate();

  const { setUserName, setUserId, setAvatarLink, setToken, setEmail } =
    useStorage();

  function handleLogin() {
    setIsLoading(true);

    setTimeout(() => {
      Auths.login({ email: emailLogin, password: passwordLogin })
        .then((response) => {
          if (response.status === "success") {
            setIsLoading(false);
            const data = response.data;

            setToken(data.token);
            setUserId(data.userId);
            setUserName(data.userName);
            setAvatarLink(data.avatarLink);
            setEmail(data.email);

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
    emailLogin,
    setEmailLogin,
    passwordLogin,
    setPasswordLogin,
    errMessage,
    setErrMessage,
    handleLogin,
    isLoading,
    setIsLoading,
  };
}
