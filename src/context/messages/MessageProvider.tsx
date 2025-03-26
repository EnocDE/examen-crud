import { ReactNode, useState } from "react";
import { MessagesContext } from "./messageContext";
import { MessageTypes } from "./types/messages.types";

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [showMessageElement, setShowMessageElement] = useState(false);
  const [messageType, setMessageType] = useState<MessageTypes>();
  const [message, setMessage] = useState("");

  const sendMessage = (
    msg: string,
    type: MessageTypes,
    timeInMs: number = 5000
  ) => {
    setMessage(msg);
    setShowMessageElement(true);
    setMessageType(type);
    setTimeout(() => setShowMessageElement(false), timeInMs);
  };

  return (
    <MessagesContext.Provider
      value={{
        showMessageElement,
        message,
        sendMessage,
        messageType,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
