import "../CSS/courseDetails.css"
export default function CourseDetails(props){
    const courseDetails = props.courseDetails.split('|')
    
    const total = courseDetails[1]
    const present = courseDetails[0]
    const absent = total-present
    const percentage  = ((present/total)*100).toFixed(2)

    const temp  = (((4*present)-(3*total))/3).toFixed(0)
    const freeLeaves = temp>0?temp:"NaN"
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