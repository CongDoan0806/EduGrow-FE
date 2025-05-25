import React from 'react';
import SetGoalsSubject from '../../../components/students/SetGoalsSubject';
import './SetGoals.css';
import Footer from '../../../components/students/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const SetGoals = () => {
  return (
    <div className="setgoal-page-container">
      <main className="content-wrapper">
        <section className="my-5">
          <SetGoalsSubject />
        </section>
      </main>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default SetGoals;