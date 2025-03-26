import { createContext } from "react";
import { AuthContextInitial } from "../types/auth.types";

export const AuthContext = createContext({} as AuthContextInitial);
