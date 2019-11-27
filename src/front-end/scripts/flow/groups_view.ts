import { HistoryNode, HistoryNodeState } from "./base/history_node";
import { GetGroups } from "../tools/commands";
import { SubGroupsView } from "./subgroups_view";

export class GroupsView extends HistoryNode {
    constructor() {
        super();
    }
    initiate() {
        let container = <HTMLDivElement>document.getElementById("container");
        this.render(container);
    }
    async render(container: HTMLDivElement) {
        let fragment = document.createDocumentFragment();
        // let buttonsContainer = document.createElement('div');
        // buttonsContainer.id = 
        (await this.loadGroups()).forEach(group => {
            let b = document.createElement('button');
            b.innerText = group.name;
            b.onclick = () => {
                console.log(this.state);
                if (this.state == HistoryNodeState.ACTIVE) {
                    // you have group id here
                    this.openGroup(group.id);
                }
            };
            fragment.appendChild(b);
        });
        container.innerHTML = "";
        container.appendChild(fragment);
    }
    async loadGroups() {
        return await (window as any).ipc.rr.send_command(new GetGroups());
    }
    openGroup(group_id: Number) {
        this.openNext(new SubGroupsView(group_id));
    }
    stop() {

    }
}
