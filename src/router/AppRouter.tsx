import { Route, Routes } from "react-router";
import { LoginPage } from "../auth/pages/LoginPage";
import { UsersRoutes } from "../users/routes/UsersRoutes";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <UsersRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
