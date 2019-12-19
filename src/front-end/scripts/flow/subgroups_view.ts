import { HistoryNode, HistoryNodeState } from "./base/history_node";
import { GetSubGroups } from "../tools/commands";
import { generateMenuButtonsList } from "../tools/html_creators";
import { NodeDetailedView } from "./node_detailed_view/node_detailed_view";

export class SubGroupsView extends HistoryNode {
    group_id: Number;
    constructor(group_id: Number) {
        super();
        this.group_id = group_id;
    }
    initiate() {
        let container = <HTMLDivElement>document.getElementById("container");
        this.render(container);
    }
    async render(container: HTMLDivElement) {
        let fragment = document.createDocumentFragment();
        fragment.appendChild(
            generateMenuButtonsList({
                header: "Select a subgroup",
                textsAndCallbacks: (await this.loadSubGroups()).map(group => [
                    group.name,
                    () => {
                        if (this.state == HistoryNodeState.ACTIVE) {
                            // you have group id here
                            this.openSubGroup(group.id);
                        }
                    }
                ]),
                addBackButton: true,
                backCallback: () => {
                    this.goBack();
                }
            })
        );
        container.innerHTML = "";
        container.appendChild(fragment);
    }
    async loadSubGroups() {
        return (await (window as any).ipc.rr.send_command(new GetSubGroups(this.group_id))).SubGroups;
    }
    openSubGroup(subgroup_id: Number) {
        this.openNext(new NodeDetailedView({ subgroup_id, path: [] }));
    }
    stop() {}
}
