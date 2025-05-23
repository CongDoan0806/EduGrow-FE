import React from 'react';
import SetGoalsSubject from '../../../components/students/SetGoalsSubject';
import './SetGoals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SetGoals = () => {
  return (
    <div>
      <section className="my-5">
        <SetGoalsSubject />
      </section>
    </div>
  );
}

export default SetGoals;