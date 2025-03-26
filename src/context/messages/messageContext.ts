import { createContext } from "react";
import { MessagesContextValues } from "./types/messages.types";

export const MessagesContext = createContext({} as MessagesContextValues)
