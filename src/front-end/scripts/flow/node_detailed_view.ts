import { HistoryNode, HistoryNodeState } from "./base/history_node";
import { generateMenuButtonsList } from "../tools/html_creators";
import { GetRootNodes, GetChildNodes } from "../tools/commands";

export class NodeDetailedView extends HistoryNode {
    node: object | null;
    parent_id: Number | null;
    subgroup_id: Number | null;
    constructor({
        node,
        parent_id,
        subgroup_id
    }: {
        node?: object;
        parent_id?: Number;
        subgroup_id?: Number;
    }) {
        super();
        this.node = node;
        this.parent_id = parent_id;
        this.subgroup_id = subgroup_id;
        console.log(node);
    }
    initiate() {
        let container = <HTMLDivElement>document.getElementById("container");
        this.render(container);
    }
    async render(container: HTMLDivElement) {
        let fragment = document.createDocumentFragment();
        // fragment.appendChild(generateMenuButtonsList(
        // ));
        console.log(await this.loadChildren());
        container.innerHTML = "";
        container.appendChild(fragment);
    }
    openNode(node) {}
    async loadChildren() {
        if (this.node) {
            // Just showing the parents
        } else if (this.parent_id) {
            // Will create a node
        } else if (this.subgroup_id) {
            // Viewing the root of the subgroup
            return await (window as any).ipc.rr.send_command(new GetRootNodes(this.subgroup_id));
        } else {
            throw new Error("Trying to load uninitialized node detailed view.");
        }
    }
    stop() {}
}
