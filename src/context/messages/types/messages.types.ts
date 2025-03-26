export const messageTypeAllowed = {
  ok: "ok", warning: "warning", error: "error"
}

export type MessageTypes = "ok" | "warning" | "error"

export interface MessagesContextValues {
  showMessageElement: boolean
  message: string
  sendMessage: (msg: string, type: MessageTypes, timeInMs?: number) => void
  messageType: string | undefined
}