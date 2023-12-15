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


const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout><HomeScreen /></DefaultLayout>,
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
        path: "/product",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <ProtectedRoute>
                    <Product />
                </ProtectedRoute>
            </GlassPane>
        </DefaultLayout>,
    },
]);

export default router