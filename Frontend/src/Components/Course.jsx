import "../CSS/course.css"
export default function Course(props){
    return(
    <div className="course-card">
      <h3>{props.name}</h3>

      <button
        className="delete-course-btn"
        onClick={() => props.onDelete(props.name)}
      >
        ✕
      </button>
    </div>

    )
}