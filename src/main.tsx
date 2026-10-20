import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from "react-router";
import {AuthProvider} from "./contexts/Auth/AuthProvider.tsx";
import {PaginationProvider} from "./contexts/Pagination/PaginationProvider.tsx";
import './css/styles.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <PaginationProvider>
                    <App/>
                </PaginationProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
