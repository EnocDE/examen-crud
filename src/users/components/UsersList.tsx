import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../auth/hooks/useAuth";
import useConfirmation from "../../hooks/useConfirmation";
import useMessage from "../../hooks/useMessage";
import { usersConfig } from "../../lib/axios";
import { Button } from "../../ui/components";
import { Confirmation } from "../../ui/components";
import { TableData } from "../../ui/components/table";
import { TableHead } from "../../ui/components/table";
import { isAdmin } from "../../utils/helpers";
import { Users } from "../types/userSchema";

interface UsersListProps {
  data: Users | undefined;
}

export default function UsersList({ data }: UsersListProps) {
  const { authUser } = useAuth();
  const { sendMessage } = useMessage();
  const { hideConfirmationElement, showConfirmationElement, showConfirmation } =
    useConfirmation();

  // Poner el id en el estado local
  const [userId, setUserId] = useState<number | undefined>();

  // Retornar el color de la celda si es par
  const isEven = (index: number) => (index % 2 != 0 ? "bg-slate-200" : "");

  // Funciones para agregar y eliminar la clase de color a la fila cuando el cursor esta encima
  const addColorToCurrentMoueRow = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    e.currentTarget.classList.add("bg-slate-600");
    e.currentTarget.classList.add("text-white");
  };
  const removeColorToCurrentMoueRow = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    e.currentTarget.classList.remove("bg-slate-600");
    e.currentTarget.classList.remove("text-white");
  };

  const handleConfirmation = (id: number) => {
    if (!isAdmin(authUser?.role))
      return sendMessage(
        "No tienes permisos para realizar esta acción",
        "error"
      );
    setUserId(id);
    showConfirmationElement();
  };

  // Manejo de la petición al eliminar un elemento
  const handleRemove = async (id: number) => {
    hideConfirmationElement();
    try {
      const response = await usersConfig.delete(`/users/${id}`);
      if (response.status != 200)
        return sendMessage(
          "No se pudo eliminar el usuario, porfavor vuelve a intentarlo",
          "warning"
        );
      sendMessage("Usuario eliminado correctamente", "ok");
    } catch (error) {
      if (error instanceof Error) {
        sendMessage(
          "Ha ocurrido un error en la petición, por favor vuelve a intentarlo",
          "error"
        );
      }
    }
  };

  if (!authUser) return <p>cargando...</p>;

  return (
    <>
      <div className="max-w-screen mx-5 max-h-[70vh] shadow-md bg-white rounded-xl overflow-auto">
        <table className="min-w-full relative">
          <thead>
            <tr>
              <TableHead
                colSpan={6}
                className="bg-slate-100"
              >
                User Info
              </TableHead>
              <TableHead
                colSpan={4}
                className="bg-slate-100"
              >
                Address
              </TableHead>
              <TableHead
                colSpan={2}
                className="bg-slate-100"
              >
                Geo
              </TableHead>
              <TableHead
                colSpan={3}
                className="bg-slate-100"
              >
                Company
              </TableHead>
            </tr>
            <tr>
              <TableHead className="bg-slate-100 sticky top-0">ID</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">Name</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">
                Username
              </TableHead>
              <TableHead className="bg-slate-100 sticky top-0">Email</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">Phone</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">
                Website
              </TableHead>
              <TableHead className="bg-slate-100 sticky top-0">
                Street
              </TableHead>
              <TableHead className="bg-slate-100 sticky top-0">Suite</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">City</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">
                Zipcode
              </TableHead>
              <TableHead className="bg-slate-100 sticky top-0">Lat</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">Long</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">Name</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">Bs</TableHead>
              <TableHead className="bg-slate-100 sticky top-0">
                Phrase
              </TableHead>
              <TableHead className="bg-slate-100 sticky top-0">
                Actions
              </TableHead>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr
                onMouseEnter={addColorToCurrentMoueRow}
                onMouseLeave={removeColorToCurrentMoueRow}
                key={user.id}
                className={`transition-colors ${isEven(
                  index
                )} border text-center`}
              >
                <TableData>{user.id}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.username}</TableData>
                <TableData>{user.email}</TableData>
                <TableData className=" text-nowrap">{user.phone}</TableData>
                <TableData>{user.website}</TableData>
                <TableData>{user.address.street}</TableData>
                <TableData className=" text-nowrap">
                  {user.address.suite}
                </TableData>
                <TableData>{user.address.city}</TableData>
                <TableData className=" text-nowrap">
                  {user.address.zipcode}
                </TableData>
                <TableData>{user.address.geo.lat}</TableData>
                <TableData>{user.address.geo.lng}</TableData>
                <TableData>{user.company.name}</TableData>
                <TableData>{user.company.bs}</TableData>
                <TableData>{user.company.catchPhrase}</TableData>
                <TableData>
                  <div className="flex justify-evenly items-center m-5 gap-5">
                    {isAdmin(authUser.role) ? (
                      <>
                        <Button className="text-white bg-yellow-400 ">
                          <Link to={`/users/edit/${user.id}`}>Editar</Link>
                        </Button>
                        <Button
                          className="rounded bg-red-500 text-white"
                          onClick={() => handleConfirmation(user.id)}
                        >
                          Eliminar
                        </Button>
                      </>
                    ) : authUser.id === user.id ? (
                      <>
                        <Button className="text-white bg-yellow-400 ">
                          <Link to={`/users/edit/${user.id}`}>Editar</Link>
                        </Button>
                      </>
                    ) : null}
                  </div>
                </TableData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showConfirmation && (
        <Confirmation label="¿Realmente deseas eliminar el usuario?">
          <Button
            onClick={() => userId && handleRemove(userId)}
            className="bg-red-500 text-white border mx-auto border-red-600 w-full sm:w-auto"
          >
            Eliminar
          </Button>
          <Button
            onClick={() => hideConfirmationElement()}
            className="border mx-auto"
          >
            Cancelar
          </Button>
        </Confirmation>
      )}
    </>
  );
}
