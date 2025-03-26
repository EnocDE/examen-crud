import { FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../auth/hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import useMessage from "../../hooks/useMessage";
import { usersConfig } from "../../lib/axios";
import { BackButton, Message, Title } from "../../ui/components";
import {
  getObjectWithDataFromAFormData,
  isAdmin,
  thereIsAnEmptyValue,
} from "../../utils/helpers";
import UsersForm from "../components/UsersForm";
import { User, UserSchema } from "../types/userSchema";

export function EditUsersPage() {
  const navigate = useNavigate();
  const { sendMessage } = useMessage();
  const { id } = useParams();
  const {
    data: user,
    error,
    loading,
  } = useFetch<User>({
    url: `/users/${id}`,
    schema: UserSchema,
  });
  const { authUser } = useAuth();

  // Manejar actualización de los datos
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obtener formdata y convertir a un objeto
    const formData = new FormData(e.currentTarget);
    const formDataObj = getObjectWithDataFromAFormData(formData);

    // Comprobar campos vacios
    if (thereIsAnEmptyValue(formDataObj))
      return sendMessage("Por favor llena todos los campos", "error");

    // Crear objeto para la petición
    const newDataObj = {
      name: formDataObj?.name,
      username: formDataObj?.username,
      email: formDataObj?.email,
      address: {
        street: formDataObj?.address,
        suite: formDataObj?.suite,
        city: formDataObj?.city,
        zipcode: formDataObj?.zipcode,
        geo: {
          lat: formDataObj?.lat,
          lng: formDataObj?.lng,
        },
      },
      phone: formDataObj?.phone,
      website: formDataObj?.website,
      company: {
        name: formDataObj?.company_name,
        catchPhrase: formDataObj?.phrase,
        bs: formDataObj?.bs,
      },
    };

    // Verificar permisos del usuario
    if (authUser?.id != id && !isAdmin(authUser?.role))
      return sendMessage(
        "No tienes permisos para realizar esta acción",
        "error"
      );

    // Realizar petición a la API
    try {
      const response = await usersConfig.put(`/users/${id}`, newDataObj);
      if (response.status != 200)
        return sendMessage(
          "No se pudo actualizar los datos, porfavor vuelve a intentarlo",
          "warning"
        );
      sendMessage("El usuario se ha editado correctamente", "ok");
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        sendMessage(
          "Ha ocurrido un error en la petición, por favor vuelve a intentarlo",
          "error"
        );
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error.error)
    return (
      <p>
        Ah ocurrido un error: <small className="font-medium">{error.msg}</small>
      </p>
    );
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-5 max-w-xl">
        <BackButton />
        <Title className="text-3xl font-medium text-center py-5 text-white">
          Editando el usuario{" "}
          <span className="font-bold">
            <span className="text-amber-300">{user?.name}</span>
          </span>
        </Title>
        <Message />
        <UsersForm
          handleSubmit={handleSubmit}
          user={user}
          buttonLabel="Actualizar usuario"
        />
      </div>
    </div>
  );
}
