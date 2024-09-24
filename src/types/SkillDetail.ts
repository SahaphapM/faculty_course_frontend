import type { Skill } from "./Skills";
import type { Subject } from "./Subjects";

export type SkillDetail = {
    id?: number;
    domain: string;
    description: string;
    level: number;
    subjects: Subject[];
    skill: Skill[];
}