import http from './http'
export class CourseService {
  static getStudents() {
    // return http.get('/students')
    return null
  }
  static getCourses() {
    return http.get('/courses')
  }

  static getCourse(id: string) {
    return http.get(`/courses/${id}`)
  }

  static delCourse(id: string) {
    return http.delete(`/courses/${id}`)
  }

  static addCourse(course: any) {
    return http.post(`/courses`, course)
  }

  static updateCourse(id: string, course: any) {
    return http.put(`/courses/${id}`, course)
  }
}
