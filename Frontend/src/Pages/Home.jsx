import { useLocation, useParams } from "react-router-dom"
import "../CSS/home.css"
import Course from "../Components/Course";
import { useState } from "react";
import axios from "axios";
export default function Home(){
    const location = useLocation();
    const username = location.state?.username
    const [listOfCourses,setListOfCourses] = useState([]);
    const [showCourseModal, setShowCourseModal] = useState(false);

  const addCourse= async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const courseName = formData.get("course-name")
        const classesAttended = formData.get("classes-attended")
        const classesCommenced = formData.get("classes-commenced")
        const courseDetails = classesAttended+"|"+classesCommenced
        const response = await axios.post("http://localhost:8080/api/home/add-course",{username,courseName,courseDetails})
        console.log(response)
        console.log(username)
        setListOfCourses(prev=>[...prev,courseName])
        setShowCourseModal(false)
  }
  const sync = async()=>{
    const response = await axios.get("http://localhost:8080/api/home/get-course-list")
    setListOfCourses(response);
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
        <h1>Welcome back, {username} </h1>
        <p>Manage your tasks efficiently and stay productive.</p>
      </section>
      <section className="courses-panel">
          <div className="courses-header">
            <div>
              <h2>Your Courses</h2>
              <p>Current Semester</p>
            </div>

          <button className="add-course-btn"
          onClick={() => setShowCourseModal(true)}>
              + Add Course
            </button>
          </div>

          <div className="courseSection">
            {listOfCourses.map((course, id) => (
              <Course
                key={id}
                name={course}
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
    </div>
  );
}