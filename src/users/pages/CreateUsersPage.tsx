import { FormEvent } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../auth/hooks/useAuth";
import useMessage from "../../hooks/useMessage";
import { usersConfig } from "../../lib/axios";
import { BackButton, Message, Title } from "../../ui/components";
import {
  getObjectWithDataFromAFormData,
  isAdmin,
  thereIsAnEmptyValue,
} from "../../utils/helpers";
import UsersForm from "../components/UsersForm";

export default function CreateUsersPage() {
  const { authUser } = useAuth();
  const { sendMessage } = useMessage();
  const redirect = useNavigate();

  // Manejar creación del usuario
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
    if (!isAdmin(authUser?.role))
      return sendMessage(
        "No tienes permisos para realizar esta acción",
        "error"
      );

    // Realizar petición a la API
    try {
      const response = await usersConfig.post(`/users`, newDataObj);
      if (response.status != 201)
        return sendMessage(
          "No se pudo crear el usuario, por favor vuelve a intentarlo",
          "warning"
        );
      sendMessage("El usuario se ha creado correctamente", "ok");
      setTimeout(() => {
        redirect("/users");
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
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-5 max-w-xl">
        <BackButton />
        <Title className="text-white">Crear nuevo usuario</Title>
        <Message />
        <UsersForm
          handleSubmit={handleSubmit}
          buttonLabel="Crear usuario"
        />
      </div>
    </div>
  );
}
