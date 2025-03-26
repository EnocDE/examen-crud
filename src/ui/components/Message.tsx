import useMessage from "../../hooks/useMessage";

export function Message() {
  const { message, showMessageElement, messageType } = useMessage();
  const color =
    messageType == "ok"
      ? "bg-green-400 border-green-500 text-white"
      : messageType == "warning"
      ? "bg-amber-400 border-amber-500 text-white"
      : messageType == "error"
      ? "bg-red-400 border-red-500 text-white"
      : "";
  return (
    showMessageElement && (
      <div className="flex justify-center mx-5">
        <div
          className={`p-5 my-5 rounded max-w-xl overflow-hidden border w-full  ${color}`}
        >
          <p className="text-wrap text-white font-bold text-center">
            {message}
          </p>
        </div>
      </div>
    )
  );
}
