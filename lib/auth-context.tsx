"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: null | { name: string; email: string };
  signIn: (email: string, password: string) => boolean;
  signUp: (name: string, email: string, password: string) => boolean;
  signOut: () => void;
}

const DEMO_USER = { name: "Demo User", email: "demo@bioharvest.ai" };
const DEMO_PASSWORD = "demo123";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null | { name: string; email: string }>(null);

  const signIn = (email: string, password: string) => {
    if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
      setUser(DEMO_USER);
      return true;
    }
    return false;
  };

  const signUp = (name: string, email: string, password: string) => {
    if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
      setUser({ name, email });
      return true;
    }
    return false;
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
