import { createBrowserRouter } from "react-router";
import { Layout } from "@shared/components/Layout";
import { Home } from "@features/home/Home";
import { Projects } from "@features/projects/Projects";
import { Contact } from "@features/contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "contact", Component: Contact },
    ],
  },
]);