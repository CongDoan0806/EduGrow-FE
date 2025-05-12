import CourseHours from "../../../components/students/homepage/CourseHours"
import CourseList from "../../../components/students/homepage/CourseList"
import HeroSection from "../../../components/students/homepage/HeroSection"
import TeacherList from '../../../components/students/homepage/TeacherList';
import TodayGoals from '../../../components/students/homepage/TodayGoals';
import './Homepage.css';

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