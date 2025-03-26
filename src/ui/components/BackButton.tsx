import { useNavigate } from "react-router";
import { Button } from "./Button";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/users")}
      className="bg-red-500 text-white ml-auto block"
    >
      Regresar
    </Button>
  );
}
