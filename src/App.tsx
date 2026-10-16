import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Header from "./components/Layout/Header.tsx";
import {useAuth} from "./hooks/useAuth.ts";
import Loader from "./components/UI/Loader.tsx";
import MyRoutes from "./routes/MyRoutes.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            retryDelay: 1000,
        },
    },
});

export default function App() {
    const {isLoading} = useAuth();

    if (isLoading) return (
        <div className="h-screen flex justify-center items-center">
            <Loader size="md"/>
        </div>
    );

    return (
        <QueryClientProvider client={queryClient}>
            <Header/>

            <main className="container my-10 px-5 sm:mx-auto">
                <MyRoutes/>
            </main>

            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}
