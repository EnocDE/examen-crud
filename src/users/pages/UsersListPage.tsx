import { Link } from "react-router";
import useAuth from "../../auth/hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import { Button, Message, Title } from "../../ui/components";
import { isAdmin } from "../../utils/helpers";
import UsersList from "../components/UsersList";
import { Users, UsersSchema } from "../types/userSchema";

export function UsersListPage() {
  const { data, error, loading } = useFetch<Users>({
    url: "/users",
    schema: UsersSchema,
  });
  const { logout, authUser } = useAuth();

  if (loading || !authUser) return <p>Cargando...</p>;
  if (error.error) return <p>Ha ocurrido un error... {error.msg}</p>;
  return (
    <div className="w-full min-h-screen">
      <Title className="text-white">Tabla de usuarios</Title>
      <Message />
      <UsersList data={data} />
      <div className="p-5 flex-col sm:flex-row flex justify-center items-center gap-5">
        {isAdmin(authUser.role) && (
          <Button className=" bg-green-500 text-white">
            <Link to="/users/create">Nuevo usuario</Link>
          </Button>
        )}
        <Button
          onClick={logout}
          className=" bg-red-500 text-white"
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
