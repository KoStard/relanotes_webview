import { HistoryNode, HistoryNodeState } from "./base/history_node";
import { GetSubGroups } from "../tools/commands";
import { generate_menu_buttons_list } from "../tools/html_creators";

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
        fragment.appendChild(generate_menu_buttons_list(
            {
                header: "Select a subgroup",
                textsAndCallbacks: (await this.loadSubGroups()).map(group => [group.name, () => {
                    if (this.state == HistoryNodeState.ACTIVE) {
                        // you have group id here
                        this.openSubGroup(group.id);
                    }
                }]),
                addBackButton: true,
                backCallback: () => {
                    this.goBack();
                }
            }
        ));
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
