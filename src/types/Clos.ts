import type { Plos } from './Plos'
import type { Subject } from './Subjects'

type Clos = {
  id: string
  description: string
  subject: Subject
  plos: Plos
}

export type { Clos }
