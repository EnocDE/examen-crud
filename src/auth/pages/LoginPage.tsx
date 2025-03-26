import { FormEvent } from "react";
import usersDB from "../../../usersDB.json";
import useMessage from "../../hooks/useMessage";
import { Button, FormInput } from "../../ui/components";
import { Message } from "../../ui/components/Message";
import { Title } from "../../ui/components";
import {
  getObjectWithDataFromAFormData,
  thereIsAnEmptyValue,
} from "../../utils/helpers";
import useAuth from "../hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const { sendMessage } = useMessage();

  // Manejar inicio de sesión
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj = getObjectWithDataFromAFormData(formData);

    if (thereIsAnEmptyValue(formDataObj))
      return sendMessage("Debes llenar todos los campos", "warning", 2000);

    const username = formDataObj?.user;
    const password = formDataObj?.pass;

    const userFound = usersDB.find((user) => user.user === username);
    if (!userFound) return sendMessage("Usuario no encontrado", "error", 2000);
    if (password !== userFound.pass)
      return sendMessage("Las credenciales no coinciden", "error", 2000);

    login(userFound);
  };

  return (
    <div className="bg-[url('/bg-login.jpg')] bg-no-repeat bg-center">
      <div className="backdrop-grayscale-100 bg-black/60 h-screen flex justify-center items-center">
        <div className="bg-gray-50 w-full m-5 sm:m-0 py-7 px-14 max-w-xl rounded-md space-y-3">
          <Title>Iniciar sesión</Title>
          <Message />
          <form
            onSubmit={handleSubmit}
            className="space-y-3 mx-auto"
          >
            <FormInput
              name="user"
              id="user"
              label="Usuario"
              type="text"
              placeholder="Nombre de usuario"
              className="border rounded p-2 w-full focus:scale-[1.02] transition-transform"
            />
            <FormInput
              name="pass"
              id="pass"
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              className="border rounded p-2 w-full focus:scale-[1.02] transition-transform"
            />
            <Button className="mt-10 mx-auto block bg-green-400 text-white">
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
