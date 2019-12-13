import { HistoryNode, HistoryNodeState } from "./base/history_node";
import { generateNodeDetailedView } from "../tools/html_creators";
import { GetRootNodes, GetChildNodes } from "../tools/commands";

export class NodeDetailedView extends HistoryNode {
    node: any | null;
    parent_id: Number | null;
    subgroup_id: Number | null;
    path: Array<String>;
    nodes: Array<any>;
    constructor({
        node,
        parent_id,
        subgroup_id,
        path
    }: {
        node?: any,
        parent_id?: Number,
        subgroup_id: Number,
        path: Array<String>
    }) {
        super();
        this.node = node;
        this.parent_id = node ? node.associated_node_id : parent_id;
        this.subgroup_id = subgroup_id;
        this.path = path;
    }
    initiate() {
        let container = <HTMLDivElement>document.getElementById("container");
        console.log("Initialized");
        this.render(container);
    }
    async render(container: HTMLDivElement) {
        this.nodes = await this.loadChildren();
        let fragment = document.createDocumentFragment();
        fragment.appendChild(generateNodeDetailedView(
            {
                backCallback: () => this.goBack(),
                absolutePath: this.path,
                pathClickCallback: function () { console.log("Path click", arguments) },
                childrenNodes: this.nodes,
                childClickCallback: e => this.openNode(this.nodes.find(node => node.id == e.currentTarget.dataset.id)),
                addClickCallback: () => this.addChild(),
                deleteClickCallback: () => this.deleteNode(),
                onNameChange: () => this.updateName(),
                onDesriptionChange: () => this.updateDescription(),
                currentNode: this.node,
                activateInputs: !this.isRoot(),
                activateAddButton: this.canHaveChildren(),
                activateDeleteButton: Boolean(this.node)
            }
        ));
        container.innerHTML = "";
        container.appendChild(fragment);
    }
    isRoot(): boolean {
        return !this.node && !this.path.length;
    }
    canHaveChildren(): boolean {
        return this.isRoot() || this.node;
    }
    openNode(node) {
        // Increment the path here
        let childNodeView = new NodeDetailedView({
            node: node,
            path: this.path.concat(node.name),
            subgroup_id: this.subgroup_id
        });
        this.openNext(childNodeView);
    }
    addChild() {
        // Will create a temporary view without a node - will create node only when name is inputted
        // This can be used only if you are in the root or you have opened an existing node
        if (!this.canHaveChildren()) {
            throw new Error("This node can't have a child het!");
        }
        let childNodeView = new NodeDetailedView({
            path: this.path.concat(""),
            subgroup_id: this.subgroup_id
        });
        this.openNext(childNodeView);
    }
    deleteNode() {

    }
    updateName() {

    }
    updateDescription() {

    }
    findNodeViewFromHistory(node_id) {
        if (this.node && this.node.id == node_id) {
            return this;
        }
        if (this.__prev instanceof NodeDetailedView) {
            return (this.__prev as NodeDetailedView).findNodeViewFromHistory(node_id);
        }
        throw new Error(`Could not find node from history with id ${node_id}`);
    }
    async loadChildren() {
        if (this.node) {
            // Just showing the parents
            console.log("Will load children", this.subgroup_id);
            return await (window as any).ipc.rr.send_command(new GetChildNodes(this.subgroup_id, this.node.id));
        } else if (this.parent_id) {
            // Will create a node
            // Maybe we don't need this - because we can't create a node inside not registered node
        } else if (this.subgroup_id) {
            // Viewing the root of the subgroup
            return await (window as any).ipc.rr.send_command(new GetRootNodes(this.subgroup_id));
        } else {
            throw new Error("Trying to load uninitialized node detailed view.");
        }
    }
    stop() { }
}
