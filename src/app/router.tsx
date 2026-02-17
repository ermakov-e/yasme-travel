import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { AuthPage } from "@pages/AuthPage";
import { GroupsPage } from "@pages/GroupsPage";
import { MapPage } from "@pages/MapPage";
import { Layout } from "@app/layouts/Layout";
import { AuthGuard, GuestGuard } from "@app/providers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: (
      <GuestGuard>
        <AuthPage />
      </GuestGuard>
    ),
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: (
          <Layout>
            <Outlet />
          </Layout>
        ),
        children: [
          {
            path: "/groups",
            element: <GroupsPage />,
          },
          {
            path: "/groups/:id",
            element: <MapPage />,
          },
        ],
      },
    ],
  },
]);
