import type { Subject } from './Subjects'

type Skill = {
  id: string
  name: string
  description: string
  domain: string
  // subjects: Subject[]
  children: Skill[]
  techSkills: Skill[]
}

export type { Skill }
