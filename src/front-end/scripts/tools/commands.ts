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

export class GetSubGroups extends Command {
    constructor(group_id: Number) {
        super("GetSubGroups", { group_id });
    }
}

export class GetRootNodes extends Command {
    constructor(subgroup_id: Number) {
        super("GetRootNodes", { subgroup_id });
    }
}

export class GetChildNodes extends Command {
    constructor(subgroup_id: Number, parent_id: Number) {
        super("GetChildNodes", { subgroup_id, parent_id });
    }
}
