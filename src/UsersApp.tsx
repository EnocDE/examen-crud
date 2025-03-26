import { AuthProvider } from "./auth/context/AuthProvider";
import { MessagesProvider } from "./context/messages";
import { AppRouter } from "./router/AppRouter";

export function UsersApp() {
  return (
    <AuthProvider>
      <MessagesProvider>
        <AppRouter />
      </MessagesProvider>
    </AuthProvider>
  );
}
