export enum AuthActionsTypes {
  Login = "[Auth] login",
  Logout = "[Auth] logout"
}

export interface AuthUser {
  id: number,
  user: string,
  role: string
}

export interface AuthState {
  authUser: AuthUser | null
  logged: boolean
}

export type AuthActions = | { type: AuthActionsTypes.Login; payload: AuthUser } | { type: AuthActionsTypes.Logout; }

export interface AuthContextInitial { authUser: AuthUser | null, logged: boolean; login: (user: AuthUser) => void; logout: () => void }