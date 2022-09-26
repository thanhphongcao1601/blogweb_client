import create from "zustand";
import { persist } from "zustand/middleware";

interface State {
  userId: string;
  userName: string;
  avatarLink: string;
  token: string;
  email: string;
  setUserId: (userId: string) => void;
  setUserName: (userName: string) => void;
  setAvatarLink: (avatarLink: string) => void;
  setToken: (token: string) => void;
  setEmail: (email: string) => void;
}

export const useStorage = create<State>()(
  persist(
    (set, get) => ({
      userId: "",
      userName: "",
      avatarLink: "",
      token: "",
      email: "",
      setUserId: (userId) => set({ userId }),
      setUserName: (userName) => set({ userName }),
      setAvatarLink: (avatarLink) => set({ avatarLink }),
      setToken: (token) => set({ token }),
      setEmail: (email) => set({ email }),
    }),
    {
      //   getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
      name: "userStorage",
    }
  )
);
