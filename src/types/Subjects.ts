import type { Curriculum } from "./Curriculums";
import type { User } from "./User";

type Subject = {
    id: string;
    thaiName: string;
    engName: string;
    description: string;
    credit: number;
    type: string;
    studyTime: string;
}
export type { Subject }