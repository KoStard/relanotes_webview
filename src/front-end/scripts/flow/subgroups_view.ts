import { HistoryNode, HistoryNodeState } from "./base/history_node";
import { GetSubGroups } from "../tools/commands";

export class SubGroupsView extends HistoryNode {
    group_id: Number;
    constructor(group_id: Number) {
        super();
        this.group_id = group_id;
    }
    initiate() {
        debugger;
        let container = <HTMLDivElement>document.getElementById("container");
        this.render(container);
    }
    async render(container: HTMLDivElement) {
        let fragment = document.createDocumentFragment();
        // let buttonsContainer = document.createElement('div');
        // buttonsContainer.id = 
        (await this.loadSubGroups()).forEach(group => {
            let b = document.createElement('button');
            b.innerText = group.name;
            b.onclick = () => {
                if (this.state == HistoryNodeState.ACTIVE) {
                    // you have group id here
                    this.openSubGroup(group.id);
                }
            };
            fragment.appendChild(b);
        });
        container.innerHTML = "";
        container.appendChild(fragment);
    }
    async loadSubGroups() {
        console.log("Loading", this.group_id);
        return await (window as any).ipc.rr.send_command(new GetSubGroups(this.group_id));
    }
    openSubGroup(group_id: Number) {

    }
    stop() {

    }
}
