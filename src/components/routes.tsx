import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import HomeScreen from "./HomeScreen";
import AuthForm from "./AuthForm";
import DefaultLayout from "./defaultLayout/defaultLayout";
import GlassPane from "./GlassPane";
import Product from "./Product";
import ProtectedRoute from "utils/ProtectedRoutes";
import DepartmentPage from "../pages/Department";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeDetailsPage from "../pages/EmployeeDetailsPage";
import ProfilePage from "../pages/ProfilePage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6"><Product />
            </GlassPane></DefaultLayout>,
    },
    {
        path: "/signin",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <AuthForm mode="signin" />
            </GlassPane>
        </DefaultLayout>,
    },
    {
        path: "/register",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <AuthForm mode="register" />
            </GlassPane>
        </DefaultLayout>,
    },
    {
        path: "/departments",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <DepartmentPage />
            </GlassPane>
        </DefaultLayout>,
    },
    {
        path: "/employees",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <EmployeeListPage />
            </GlassPane>
        </DefaultLayout>,
    },
    {
        path: "/employee/:id",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <EmployeeDetailsPage />
            </GlassPane>
        </DefaultLayout>,
    },
    {
        path: "/profile",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <ProfilePage />
            </GlassPane>
        </DefaultLayout>,
    },
    // {
    //     path: "/product",
    //     element: <DefaultLayout>
    //         <GlassPane className="candy-mesh h-screen w-screen p-6">
    //             <ProtectedRoute>
    //                 <Product />
    //             </ProtectedRoute>
    //         </GlassPane>
    //     </DefaultLayout>,
    // },
]);

export default router