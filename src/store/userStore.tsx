import { create } from "zustand";

interface UserDataInterface {
  user_id: string; // UUID
  favorite_eps: null | [];
  subscribed: null | [];
  progress: null | [];
}

interface UserStore {
  user: "" | "check" | string;
  userData: "" | UserDataInterface[];
  setUser: (newUser: string) => void;
  setUserData: (newUserData: UserDataInterface[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  /**
   * the variable we use to check the user.
   * @type {string} - one of: "", "check", "UUID" (as string)
   */
  user: "",
  userData: "",
  setUser: (newUser) => set({ user: newUser }),
  setUserData: (newUserData) => set({ userData: newUserData }),
}));
