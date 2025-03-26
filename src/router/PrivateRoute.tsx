import { ReactNode } from "react";
import useAuth from "../auth/hooks/useAuth";
import { Navigate } from "react-router";

export function PrivateRoute({ children }: { children: ReactNode }) {
  // Comprobar si el usuario esta loggeado
  const { logged } = useAuth();
  return logged ? children : <Navigate to="/login" />;
}
