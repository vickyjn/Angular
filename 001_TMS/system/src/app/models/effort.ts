export class Effort {
    desc: String = '';
    hours: Number = 0;
    type: Number = 0;
    status: Boolean = false;
    from: Boolean = true;
    contributors: Array<any>;
    id: Number = new Date().getTime();
}
