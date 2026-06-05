import "../CSS/course.css"
export default function Course(props){
    return(
        <div className="courseCard">
            <span>{props.name}</span>
        </div>
    )
}