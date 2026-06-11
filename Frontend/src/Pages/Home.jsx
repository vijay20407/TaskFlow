import { useLocation, useNavigate, useParams } from "react-router-dom"
import "../CSS/home.css"
import Course from "../Components/Course";
import { useState,useEffect } from "react";
import axios from "axios";
import CourseDetails from "../Components/CourseDetails";
import api from "../api";
export default function Home(){
    const location = useLocation();
    const from = location.state?.from
    const nav = useNavigate()
    
    const [listOfCourses,setListOfCourses] = useState([]);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showAttendanceModal,setShowAttendanceModal]=useState(false);
    const [courseMap,setCourseMap] = useState({})
    useEffect(() => {
      if(from==undefined)nav("/login")
      else sync();
        
    }, []);
  const addCourse= async(e)=>{
        
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const courseName = formData.get("course-name")
        const classesAttended = formData.get("classes-attended")
        const classesCommenced = formData.get("classes-commenced")
        const courseDetails = classesAttended+"|"+classesCommenced
        const response = await api.post("http://localhost:8080/api/home/add-course",
          {
            courseName,
            courseDetails
          })
        sync()
        setShowCourseModal(false)
        
  }
  const sync = async()=>{
    const response = await api.get("http://localhost:8080/api/home/get-courses")
    const response2 = await api.get("http://localhost:8080/api/home/get-courseMap")
    setListOfCourses(response.data);
    setCourseMap(response2.data);
  }
  const editCourseMap = async(newCourseMap)=>{

    const response = api.patch("http://localhost:8080/api/home/edit-courseMap",
      {
        newCourseMap,
      }
    )
  }
  const deleteCourse = async(courseName)=>{
    const response = await api.delete("http://localhost:8080/api/home/delete-course",
      {
        data:{
          courseName,
        }
        
      }
  )
    sync()
  }
  const submitAttendance = async(event)=>{
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const copy = courseMap
    listOfCourses.forEach((course)=>{
      const courseDetailsOriginal = courseMap[course].split("|")
      const present = Number(courseDetailsOriginal[0])+Number(formData.get(`present-${course}`))
      const absent = Number(formData.get(`absent-${course}`))
      const total = Number(courseDetailsOriginal[1])+Number(absent)+Number(formData.get(`present-${course}`))
      const courseDetails = present+"|"+total
      copy[course] = courseDetails
    })
    editCourseMap(copy)
    setShowAttendanceModal(false)
    

  }
  
    return (
      
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">TaskFlow</h2>

        <div className="nav-links">
          <button className="nav-btn">Dashboard</button>
          <button className="nav-btn">Profile</button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="hero-section">
        <p>Manage your attendence efficiently and stay productive.</p>
      </section>
      <section className="courses-panel">
          <div className="courses-header">
            <div>
              <h2>Your Courses</h2>
              <p>Current Semester</p>
            </div>
          <div className="course-actions">
            <button
              className="add-course-btn"
              onClick={sync}
            >
              Sync
            </button>

            <button
              className="add-course-btn"
              onClick={() => setShowCourseModal(true)}
            >
              + Add Course
            </button>
          </div>
            
          </div>

          <div className="courseSection">
            {listOfCourses.map((course, id) => (
              <Course
                key={id}
                name={course}
                onDelete={deleteCourse}
              />
            ))}
  {showCourseModal && (
  <div
    className="modal-overlay"
    onClick={() => setShowCourseModal(false)}
  >
    <div
      className="course-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Add Course</h2>

      <form onSubmit={addCourse}>
        <div className="modal-input-group">
          <label>Course Name</label>
          <input
            type="text"
            placeholder="Enter course name"
            name="course-name"
          />
        </div>

        <div className="modal-input-group">
          <label>
            No. of Classes Attended
          </label>
          <input
            type="number"
            min="0"
            placeholder="0"
            name="classes-attended"
          />
        </div>

        <div className="modal-input-group">
          <label>
            No. of Classes Commenced
          </label>
          <input
            type="number"
            min="0"
            placeholder="0"
            name="classes-commenced"
          />
        </div>

        <div className="modal-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              setShowCourseModal(false)
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-btn"
          >
            Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
          </div>
          
      </section>
<section className="attendance-panel">
  <div className="attendance-header-section">
    <div>
      <h2>Attendance Overview</h2>
      <p>Current Semester</p>
    </div>

    <button className="add-attendance-btn"
            onClick={()=>setShowAttendanceModal(true)}>
      + Add Attendance
    </button>
  </div>

  <div className="attendance-table-header">
    <p>Course</p>
    <p>Present</p>
    <p>Absent</p>
    <p>Total</p>
    <p>%</p>
    <p>Free Leaves</p>
  </div>

  <div className="attendance-list">
    {listOfCourses.map((course, id) => (
      <CourseDetails
        key={id}
        course={course}
        courseDetails={courseMap[course]}
      />
    ))}
  </div>
</section>
{showAttendanceModal && (
  <div
    className="modal-overlay"
    onClick={() => setShowAttendanceModal(false)}
  >
    <div
      className="attendance-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Add Your Attendance</h2>

      <form onSubmit={submitAttendance}>
        <div className="attendance-grid-header">
          <span>Course</span>
          <span>Present</span>
          <span>Absent</span>
        </div>

        {listOfCourses.map((course, index) => (
          <div
            key={index}
            className="attendance-row-input"
          >
            <span>{course}</span>

            <input
              type="number"
              min="0"
              defaultValue="0"
              name={`present-${course}`}
              className="attendance-input"
            />

            <input
              type="number"
              min="0"
              defaultValue="0"
              name={`absent-${course}`}
              className="attendance-input"
            />
          </div>
        ))}

        <div className="modal-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              setShowAttendanceModal(false)
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-btn"
          >
            Save Attendance
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>

  );
}