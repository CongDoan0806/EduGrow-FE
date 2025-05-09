import React from "react";
import Homepage from "./pages/students/homepage/Homepage";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Homepage />,
  },
];

export default routes;