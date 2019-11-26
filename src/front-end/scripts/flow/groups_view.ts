import { HistoryNode } from "./base/history_node";
import { GetGroups } from "../tools/commands";

export class GroupsView extends HistoryNode {
    constructor() {
        super();
    }
    initiate() {
        let container = <HTMLDivElement>document.getElementById("container");
        (async () => {
            let html = (await this.loadGroups()).map(group => `<p>${group}</p>`).join("");
            container.innerHTML = html;
        })();
    }
    async loadGroups() {
        return await (window as any).ipc.rr.send_command(new GetGroups());
    }
    stop() {

    }
}
