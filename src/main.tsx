import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './css/styles.css';
import {BrowserRouter} from "react-router";
import {AuthProvider} from "./contexts/Auth/AuthProvider.tsx";
import 'react-loading-skeleton/dist/skeleton.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
