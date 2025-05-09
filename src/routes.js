import React from "react";
import Homepage from "./pages/students/homepage/Homepage";
import Login from "./pages/login/Login";
import LearningJounal from "./pages/students/learning_journal/LearningJournal.jsx";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Homepage />,
  },
  {
    path : '/login',
		exact : true,
		main : ()=> <Login />
  },
  {
    path: '/learningJournal',
    exact: true,
    main: () => <LearningJounal />
  }
];

export default routes;