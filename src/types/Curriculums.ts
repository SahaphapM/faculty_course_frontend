import type { Branch } from './Branch';
// import type { Plo } from 'src/plos/entities/plo.entity';
// import type { Subject } from 'src/subjects/entities/subject.entity';
import type { User } from './User';

export type Curriculum = {
  id: string;
  thaiName: string;
  engName: string;
  thaiDegreeName: string;
  engDegreeName: string;
  branch: Branch[];
  description: string;
  period: number;
  minimumGrade: number;
  // plos: Plo[];
  coordinators: User[];
  // subjects: Subject[];
};