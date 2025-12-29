import { BrowserRouter, Link } from 'react-router-dom';
import {useMsal} from "@azure/msal-react";
import "../app.css"
const NAV_LINKS = ["Home", "Dashboard", "Logout"] as const;

export const Header = () => {
    const { accounts, instance } = useMsal();
    const user = accounts[0];
    const handleLogout = () => {
        instance.logoutRedirect({
    postLogoutRedirectUri: "/login", // This ensures the main window redirects
  }).catch(e => console.error(e));
    };
  return (
    <div className="wrapper">
     <div className="logo">Logo Here</div>   
    <BrowserRouter>
      <ul>
        {NAV_LINKS.map((item) => {
          // Define the path: Use '/' for Home, otherwise lowercase the name
          const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
          return (
            <li key={item}>
              <Link to={path} onClick={item ==="Logout"? handleLogout : undefined}>{item}</Link>
            </li>
          );
        })}
      </ul>
    </BrowserRouter>
    </div>
    
  );
};
