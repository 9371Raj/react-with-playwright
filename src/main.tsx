import { render } from 'preact';
import { MsalProvider } from '@azure/msal-react';
import { EventType, type EventMessage, type AuthenticationResult } from '@azure/msal-browser';
import { msalInstance } from './config/authConfig';
import './index.css';
import  App  from './app';

async function bootstrap() {
    // 1. Initialize MSAL
    await msalInstance.initialize();

    // 2. Handle account selection (logic for page refreshes)
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
    }

    // 3. Listen for successful logins
    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            msalInstance.setActiveAccount(payload.account);
        }
    });

    // 4. Render the App
    const root = document.getElementById('app');
    if (root) {
        render(
            <MsalProvider instance={msalInstance}>
                <App />
            </MsalProvider>,
            root
        );
    }
}

bootstrap().catch(console.error);
