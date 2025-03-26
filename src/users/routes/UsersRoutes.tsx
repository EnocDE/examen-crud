import { Navigate, Route, Routes } from "react-router";
import CreateUsersPage from "../pages/CreateUsersPage";
import { EditUsersPage } from "../pages/EditUsersPage";
import { UsersListPage } from "../pages/UsersListPage";

export function UsersRoutes() {
  return (
    <>
      <div className="bg-[url('/bg.jpg')] bg-cover bg-no-repeat">
        <div className="bg-black/60 backdrop-grayscale-100 backdrop-blur-[3px]">
          <Routes>
            <Route
              path="/users"
              element={<UsersListPage />}
            />
            <Route
              path="/users/edit/:id"
              element={<EditUsersPage />}
            />
            <Route
              path="/users/create"
              element={<CreateUsersPage />}
            />
            <Route
              path="*"
              element={<Navigate to="/users" />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
