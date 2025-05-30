import React from 'react'
import ListStudentItem from '../../../components/teachers/ListStudentItem'
import './ListStudentTeacher.css'

export default function ListStudentTeacher() {
  return (
    <div>
        <div className="list-student">
      {/* <TeacherSidebar /> */}
      <div className="main-content-student">
        <ListStudentItem/>
      </div>
    </div>
    </div>
  )
}
