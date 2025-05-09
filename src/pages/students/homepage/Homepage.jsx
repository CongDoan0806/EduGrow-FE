import React from 'react';
import TeacherList from '../../../components/students/homepage/TeacherList';
import TodayGoals from '../../../components/students/homepage/TodayGoals';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
  return (
    <div>
      <section className="my-5">
        <TodayGoals />
      </section>
      
      <section className="my-5">
        <TeacherList />
      </section>
    </div>
  );
};

export default Homepage;
