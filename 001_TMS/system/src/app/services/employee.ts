export interface Employee {
    _id: string;
    ntid: string;
    date: Date;
    task: string;
    taskDescription: string;
    taskType: string;
    status: string;
    activities:Activity[];
}

export interface Activity {
    activityname: string;
    hourspend: Number;
}