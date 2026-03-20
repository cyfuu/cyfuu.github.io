import { createHashRouter } from "react-router"; // <-- change here
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/home/Home";
import { Projects } from "./components/pages/projects/Projects";
import { Contact } from "./components/pages/contact/Contact";

export const router = createHashRouter([ // <-- use hash router
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
