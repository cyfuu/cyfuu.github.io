import { createHashRouter } from "react-router";
import { Layout } from "@shared/components/Layout";
import { Home } from "@features/home/Home";
import { Projects } from "@features/projects/Projects";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
    ],
  },
]);