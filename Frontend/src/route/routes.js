// import React from 'react'
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage";
import LoginLayout from "../layouts/LoginLayout/LoginLayout";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import InformationPersonal from "../pages/InformationPersonal";
import UserManagementDevices from "../pages/UserManagementDevices";
import AdManagementDevices from "../pages/AdManagementDevices/AdManagementDevices";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AdManagementFarm from "../pages/AdManagementFarm/AdManagementFarm";
import AdManagementUsers from "../pages/AdManagementUsers/AdManagementUsers";
import FarmInformationPage from "../pages/FarmInformationPage";
import StatisticalPage from "../pages/StatisticalPage";

export default function RouteComponent() {
    const routeElements = useRoutes([
        {
            path: "/",
            element: (
                <MainLayout>
                    <HomePage />
                </MainLayout>
            ),
        },
        {
            path: "/farms-information",
            element: (
                <MainLayout>
                    <FarmInformationPage />
                </MainLayout>
            ),
        },
        {
            path: "/register",
            element: (
                <LoginLayout>
                    <Register />
                </LoginLayout>
            ),
        },
        {
            path: "/login",
            element: (
                <LoginLayout>
                    <Login />
                </LoginLayout>
            ),
        },
        {
            path: "/forgot-password",
            element: (
                <LoginLayout>
                    <ForgotPassword />
                </LoginLayout>
            ),
        },
        {
            path: "/information-personal/*",
            element: (
                <MainLayout>
                    <InformationPersonal />
                </MainLayout>
            ),
        },
        {
            path: "/user-management-devices/*",
            element: (
                <MainLayout>
                    <UserManagementDevices />
                </MainLayout>
            ),
        },
        {
            path: "/statistical/*",
            element: (
                <MainLayout>
                    <StatisticalPage />
                </MainLayout>
            ),
        },
        {
            path: "/admin-management-devices",
            element: (
                <AdminLayout>
                    <AdManagementDevices />
                </AdminLayout>
            ),
        },
        {
            path: "/admin-management-farms",
            element: (
                <AdminLayout>
                    <AdManagementFarm />
                </AdminLayout>
            ),
        },
        {
            path: "/admin-management-users",
            element: (
                <AdminLayout>
                    <AdManagementUsers />
                </AdminLayout>
            ),
        },
    ]);
    return routeElements;
}
