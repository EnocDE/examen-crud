import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("El AuthContext debe ser utilizado dentro de AuthProvider");
  const { login, logout, logged, authUser } = context;
  return {
    login,
    logout,
    logged,
    authUser,
  };
}
