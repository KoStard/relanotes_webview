import { HistoryNode, HistoryNodeState } from "./base/history_node";
import { GetGroups } from "../tools/commands";
import { SubGroupsView } from "./subgroups_view";
import { generateMenuButtonsList } from "../tools/html_creators";

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
        fragment.appendChild(generateMenuButtonsList(
            {
                header: "Select a group",
                textsAndCallbacks: (await this.loadGroups()).map(group => [group.name, () => {
                    if (this.state == HistoryNodeState.ACTIVE) {
                        // you have group id here
                        this.openGroup(group.id);
                    }
                }]),
            }
        ));
        container.innerHTML = "";
        container.appendChild(fragment);
    }
    async loadGroups() {
        console.log((await (window as any).ipc.rr.send_command(new GetGroups())))
        return (await (window as any).ipc.rr.send_command(new GetGroups())).Groups;
    }
    openGroup(group_id: Number) {
        this.openNext(new SubGroupsView(group_id));
    }
    stop() {

    }
}
