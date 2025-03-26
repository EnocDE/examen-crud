import { AuthActions, AuthState, AuthActionsTypes } from "../types/auth.types";

export const initialState: AuthState = {
  logged: false,
  authUser: null
}

export function authReducer(state: AuthState, action: AuthActions): AuthState {
  if (action.type === AuthActionsTypes.Login) {
    return {
      ...state,
      authUser: action.payload,
      logged: true
    }
  }
  if (action.type === AuthActionsTypes.Logout) {
    return {
      authUser: null,
      logged: false
    }
  }
  return state
}