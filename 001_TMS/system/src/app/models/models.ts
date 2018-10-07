import { Effort } from './effort';

export class Activity {
    date: String;
    active: Boolean = true;
    onReview: Boolean = false;
    effort: Array<Effort> = [];
    skills: Array<any>;
}
/**
 * Profile
 * @owner: Lavanya R
 */
export class Profile {
    id: Number;
    firstName: String;
    lastName: String;
    picture: String;
    designation: String;
    tools: String;
    technology: String;
    experience: String;
    skills: Array<Skill> = [];
}
/**
 * Skill
 * @owner: Lavanya R
 */
export class Skill {
    skill: String;
    rate: Number;
    skillId: Number;
    levels: Array<any> = [];
}

// export class Level {
//     level1: Array<any>;
//     level2: Array<any>;
//     level3: Array<any>;
// }
