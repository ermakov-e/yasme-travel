import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { AuthPage } from "@pages/AuthPage";
import { GroupsPage } from "@pages/GroupsPage";
import { MapPage } from "@pages/MapPage";
import { Layout } from "@app/layouts/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
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
]);
