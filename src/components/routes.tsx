import React from "react";
import {
    createBrowserRouter,

} from "react-router-dom";
import AuthForm from "./AuthForm";
import DefaultLayout from "./defaultLayout/defaultLayout";
import GlassPane from "./GlassPane";
import ProtectedRoute from "utils/ProtectedRoutes";
import DepartmentPage from "../pages/Department";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeDetailsPage from "../pages/EmployeeDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import Dashboard from "./dashboard/dashboard";

const role = JSON.parse(localStorage.getItem('RoleInfo'))

const RenderHomepage = role?.roleName != 'manager' ? true : false
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                {RenderHomepage ? <EmployeeDetailsPage /> : <Dashboard />

                }
            </GlassPane></DefaultLayout>,
    },
    {
        path: "/dashboard",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            </GlassPane></DefaultLayout>,
    },
    {
        path: "/employeedetails",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <ProtectedRoute>
                    <EmployeeDetailsPage />
                </ProtectedRoute>
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
                <ProtectedRoute>
                    <DepartmentPage />
                </ProtectedRoute>
            </GlassPane>
        </DefaultLayout>,
    },
    {
        path: "/employees",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <ProtectedRoute>
                    <EmployeeListPage />
                </ProtectedRoute>
            </GlassPane>
        </DefaultLayout>,
    },
    {
        path: "/employee/:id",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <ProtectedRoute>
                    <EmployeeDetailsPage />
                </ProtectedRoute>
            </GlassPane>
        </DefaultLayout>,
    },
    {
        path: "/profile",
        element: <DefaultLayout>
            <GlassPane className="candy-mesh h-screen w-screen p-6">
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            </GlassPane>
        </DefaultLayout>,
    },
]);

export default router