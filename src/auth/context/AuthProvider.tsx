import { ReactNode, useReducer } from "react";
import { AuthContext } from "./authContext";
import { authReducer, initialState } from "./authReducer";
import {
  AuthActions,
  AuthActionsTypes,
  AuthState,
  AuthUser,
} from "../types/auth.types";

const init = (): AuthState => {
  const storageData = localStorage.getItem("user");
  const authUser = storageData ? JSON.parse(storageData) : null;
  return {
    logged: !!authUser,
    authUser,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);
  const { logged, authUser } = authState;

  const login = (user: AuthUser) => {
    const action: AuthActions = {
      type: AuthActionsTypes.Login,
      payload: user,
    };
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(action);
  };

  const logout = () => {
    const action: AuthActions = {
      type: AuthActionsTypes.Logout,
    };
    localStorage.removeItem("user");
    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ login, logout, logged, authUser }}>
      {children}
    </AuthContext.Provider>
  );
}
