import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: string;
  profile_image?: string | null;
}

interface SessionStore {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionChecked: boolean;

  setUser: (user: SessionUser | null) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setSessionChecked: (value: boolean) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        sessionChecked: false,

        setUser: (user) =>
          set({
            user,

            isAuthenticated: Boolean(user),
          }),

        setLoading: (value) =>
          set({
            isLoading: value,
          }),

        setAuthenticated: (value) =>
          set({
            isAuthenticated: value,
          }),

        setSessionChecked: (value) =>
          set({
            sessionChecked: value,
          }),

        clearSession: () =>
          set({
            user: null,
            isAuthenticated: false,
            sessionChecked: false,
          }),
      }),
      {
        name: "neylon-session",
      },
    ),
  ),
);
