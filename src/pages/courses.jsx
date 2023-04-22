import { httpInterceptedService } from "@core/http-service";
import CourseList from "../features/courses/components/course-list";

const Courses = () => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a className="btn btn-primary fw-bolder mt-n1">
                        افزون دوره جدید
                    </a>
                </div>
                <CourseList/>
            </div>
        </div>
    )
}

export async function coursesLoader() {
    const response = await httpInterceptedService.get('/Course/list');
    console.log(response.data);
    return response.data;
}

export default Courses;