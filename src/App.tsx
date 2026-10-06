import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Route, Routes} from "react-router";
import HomePage from "./components/Pages/HomePage.tsx";
import LoginPage from "./components/Pages/LoginPage.tsx";
import Header from "./components/Layout/Header.tsx";
import EditCourseFormPage from "./components/Pages/Course/EditCourseFormPage.tsx";
import ProtectedUser from "./components/Middleware/ProtectedUser.tsx";
import ProtectedGuest from "./components/Middleware/ProtectedGuest.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            retryDelay: 1000,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header/>

            <main className="container mx-auto my-10">
                <Routes>
                    <Route element={<ProtectedGuest/>}>
                        <Route path="/login" element={<LoginPage/>}/>
                    </Route>

                    <Route element={<ProtectedUser/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/courses/:courseId/edit" element={<EditCourseFormPage/>}/>
                    </Route>
                </Routes>
            </main>

            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}
