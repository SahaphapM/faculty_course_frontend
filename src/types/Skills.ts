import type { Subject } from './Subjects'

type Skill = {
  id: string
  name: string
  description: string
  level: number
  subjects: Subject[]
  subSkills: Skill[]
  techSkills: Skill[]
  relatedSkills: Skill[]
}

export type { Skill }
