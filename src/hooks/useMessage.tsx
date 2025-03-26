import { useContext } from "react";
import { MessagesContext } from "../context/messages";

export default function useMessage() {
  const context = useContext(MessagesContext);
  if (!context)
    throw new Error("El MessageContext debe usarse dentro del MessageProvider");
  const { message, sendMessage, showMessageElement, messageType } = context;
  return {
    message,
    sendMessage,
    showMessageElement,
    messageType,
  };
}
