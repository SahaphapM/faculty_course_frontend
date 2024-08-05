import type { Subject } from './Subjects'

type Skill = {
  id: string
  name: string
  description: string
  subjects: Subject[]
}

export type { Skill }
