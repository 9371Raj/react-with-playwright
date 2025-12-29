import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

export const useAuthService = () => {
    const { instance, accounts } = useMsal();

    const getValidToken = async (scopes = ["User.Read"]) => {
        const request = {
            scopes,
            account: accounts[0]
        };

        try {
            // 1. Attempts to get from cache OR use Refresh Token automatically
            const response = await instance.acquireTokenSilent(request);
            return response.accessToken;
        } catch (error) {
            // 2. Fallback if Refresh Token has expired or user interaction is needed
            if (error instanceof InteractionRequiredAuthError) {
                const response = await instance.acquireTokenPopup(request);
                return response.accessToken;
            }
            throw error;
        }
    };

    return { getValidToken };
};
