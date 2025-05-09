import React from 'react';
import TeacherList from '../../../components/students/homepage/TeacherList';
import './Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
  return (
    <div>
      <section className="my-5">
        <TeacherList />
      </section>
    </div>
  );
};

export default Homepage;
