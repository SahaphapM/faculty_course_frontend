// type Subject = {
//   id: string
//   thaiName: string
//   engName: string
//   description: string
//   credit: number
//   type: string
//   studyTime: string
//   descriptionEng: string
// }
// export type { Subject }

import type { SkillDetail } from './SkillDetail'

export interface Subject {
  id: string
  thaiName: string
  engName: string
  description: string
  credit: number
  type: string
  studyTime: string
  skillDetails: SkillDetail[]
}
