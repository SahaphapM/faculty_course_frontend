import type { Subject } from './Subjects'

type Skill = {
  id: string
  name: string
  description: string
  type: string
  // subjects: Subject[]
  children: Skill[]
  techSkills: Skill[]
}

export type { Skill }
