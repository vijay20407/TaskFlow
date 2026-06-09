import "../CSS/courseDetails.css"
export default function CourseDetails(props){
    console.log(props.courseDetails)
    const courseDetails = props.courseDetails.split('|')
    
    const total = courseDetails[1]
    const present = courseDetails[0]
    const absent = total-present
    const percentage  = ((present/total)*100).toFixed(2)

    const freeLeaves  = (((4*present)-(3*total))/3).toFixed(0)
    return(
        <div className="course-header-row" >
            <p>{props.course}</p>
            <p>{present}</p>
            <p>{absent}</p>
            <p>{total}</p>
            <p>{percentage}%</p>
            <p>{freeLeaves}</p>

        </div>

    )
}