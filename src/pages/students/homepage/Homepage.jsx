import CourseHours from "../../../components/students/homepage/CourseHours"
import CourseList from "../../../components/students/homepage/CourseList"
import HeroSection from "../../../components/students/homepage/HeroSection"
import './Homepage.css'
export default function Homepage() {
  return (
      <main className="homepage">
        <div className="homepage-sections">
            <HeroSection />
            <CourseList />
            <CourseHours />
        </div>
    </main>
  )
}
