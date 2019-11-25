export class Command {
    cmd: String;
    args: object;
    constructor(cmd: String, args: object) {
        this.cmd = cmd;
        this.args = args;
    }
    serialize() {
        return {
            cmd: this.cmd,
            ...this.args
        };
    }
}

export class Init extends Command {
    constructor() {
        super("Init", {});
    }
}

export class GetGroups extends Command {
    constructor() {
        super("GetGroups", {});
    }
}
