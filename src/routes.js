import React from "react";
import Homepage from "./pages/students/homepage/Homepage";
import Login from "./pages/login/Login";
import LearningJounal from "./pages/students/learning_journal/LearningJournal.jsx";
import StudentProfile from "./pages/students/profile/StudentProfile";

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
  },
   {
    path: '/profile',
    exact: true,
    main: () => <StudentProfile />
  }
];

export default routes;