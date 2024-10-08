import type { SkillCollection } from './SkillCollection'
import type { Student } from './Student'
import type { Subject } from './Subjects'

export interface Course {
  id: string
  name: string
  description: string
  active: null
  courseDetails: CourseDetail[]
  subject: Subject
}

export interface CourseDetail {
  id: number
  score: number
  assignmentScore: null
  testScore: null
  projectScore: null
  student: Student
  skillCollections: SkillCollection[]
}
