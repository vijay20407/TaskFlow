import { useLocation, useParams } from "react-router-dom"
import "../CSS/home.css"
export default function Home(){
    const location = useLocation();
    const email = location.state?.email
    return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">TaskFlow</h2>

        <div className="nav-links">
          <button className="nav-btn">Dashboard</button>
          <button className="nav-btn">Tasks</button>
          <button className="nav-btn">Profile</button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="hero-section">
        <h1>Welcome back, {email} 👋</h1>
        <p>Manage your tasks efficiently and stay productive.</p>
      </section>

      {/* Quick Actions */}
      <section className="cards-section">
        <div className="home-card">
          <h3>Total Tasks</h3>
          <p>24</p>
        </div>

        <div className="home-card">
          <h3>Completed</h3>
          <p>18</p>
        </div>

        <div className="home-card">
          <h3>Pending</h3>
          <p>6</p>
        </div>

        <div className="home-card add-card">
          <span>+</span>
          <p>Add Task</p>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="recent-section">
        <h2>Recent Tasks</h2>

        <div className="task-card">
          <span>Complete React Assignment</span>
          <span>May 3</span>
        </div>

        <div className="task-card">
          <span>Prepare Presentation</span>
          <span>May 5</span>
        </div>

        <div className="task-card">
          <span>Team Meeting</span>
          <span>May 7</span>
        </div>
      </section>
    </div>
  );
}