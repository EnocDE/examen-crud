import { ReactNode } from "react";
import useAuth from "../auth/hooks/useAuth";
import { Navigate } from "react-router";

export function PublicRoute({ children }: { children: ReactNode }) {
  // Comprobar si el usuario esta loggeado
  const { logged } = useAuth();
  return logged ? <Navigate to="/users" /> : children;
}
