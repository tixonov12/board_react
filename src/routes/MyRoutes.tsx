import {AnimatePresence} from "motion/react";
import {Route, Routes, useLocation} from "react-router";
import ProtectedGuest from "../components/Middleware/ProtectedGuest.tsx";
import ProtectedUser from "../components/Middleware/ProtectedUser.tsx";
import HomePage from "../components/Pages/HomePage.tsx";
import CoursesPage from "../components/Pages/Course/CoursesPage.tsx";
import CreateCoursePage from "../components/Pages/Course/CreateCoursePage.tsx";
import EditCoursePage from "../components/Pages/Course/EditCoursePage.tsx";
import LoginPage from "../components/Pages/LoginPage.tsx";
import AnimatedLayout from "../components/Layout/AnimatedLayout.tsx";
import NotFoundPage from "../components/Pages/NotFoundPage.tsx";

export default function MyRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="*" element={<NotFoundPage/>}/>

                <Route element={<ProtectedGuest/>}>
                    <Route
                        path="/login"
                        element={
                            <AnimatedLayout>
                                <LoginPage/>
                            </AnimatedLayout>
                        }
                    />
                </Route>

                <Route element={<ProtectedUser/>}>
                    <Route
                        path="/"
                        element={
                            <AnimatedLayout>
                                <HomePage/>
                            </AnimatedLayout>
                        }
                    />

                    <Route
                        path="/courses"
                        element={
                            <AnimatedLayout>
                                <CoursesPage/>
                            </AnimatedLayout>
                        }
                    />

                    <Route
                        path="/courses/create"
                        element={
                            <AnimatedLayout>
                                <CreateCoursePage/>
                            </AnimatedLayout>
                        }
                    />

                    <Route
                        path="/courses/:courseId/edit"
                        element={
                            <AnimatedLayout>
                                <EditCoursePage/>
                            </AnimatedLayout>
                        }
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}
