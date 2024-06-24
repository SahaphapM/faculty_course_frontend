import type { User } from './User'
type Curriculum = {
    id: string ;
    thaiName: string;
    engName: string;
    thaiDegreeName: string|null;
    engDegreeName: string;
    description: string|null ; 
    coordinators: User|null , 
    period: number;
    minimumGrade: number;
  }
  
  export type { Curriculum }
  

