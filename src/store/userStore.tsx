import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

const userStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          username: "",
          name: "",
          encrypted_password: "",
          id: "",
          image: "",
          role: "",
        },
        setUser: (user: User) => set(() => ({ user: user })),
      }),
      {
        name: "user",
      }
    )
  )
);

export default userStore;
