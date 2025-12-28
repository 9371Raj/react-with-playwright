import {useMsal} from "@azure/msal-react";

export const Dashboard = () => {
    const { accounts, instance } = useMsal();
    const user = accounts[0];
    const handleLogout = () => {
        instance.logoutRedirect({
    postLogoutRedirectUri: "/login", // This ensures the main window redirects
  }).catch(e => console.error(e));
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome back, <strong>{user?.username}</strong>!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};