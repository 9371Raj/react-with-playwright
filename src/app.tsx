import { AppRoutes } from "./routes/routes";
import { Header } from "./pages/header";
import { useIsAuthenticated } from "@azure/msal-react";
const App = () => {
  const isLogin = useIsAuthenticated()
  return (
    <>
      {isLogin && <Header/>}
      <AppRoutes/>
    </>
  );
};

export default App;
