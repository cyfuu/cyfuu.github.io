import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/home/Home";
import { Projects } from "./components/pages/projects/Projects";
import { Contact } from "./components/pages/contact/Contact";

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