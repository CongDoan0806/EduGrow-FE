import React from 'react';
import CourseHours from "../../../components/students/CourseHours"
import CourseList from "../../../components/students/CourseList"
import HeroSection from "../../../components/students/HeroSection"
import TeacherList from '../../../components/students/TeacherList';
import TodayGoals from '../../../components/students/TodayGoals';
import './Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
  return (
    <div>
       <section className="my-5">
        <HeroSection />
      </section>

      <section className="my-5">
        <TodayGoals />
      </section>

      <section className="my-5">
        <CourseList />
      </section>

      <section className="my-5">
        <CourseHours />
      </section>
      
      <section className="my-5">
        <TeacherList />
      </section>
    </div>
  );
};

export default Homepage;
