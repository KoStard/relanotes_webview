import { HistoryNode } from "./history_node";

export class FlowHandler {
    history: Array<HistoryNode>;
    constructor(initialHistoryNode: HistoryNode) {
        this.history = [initialHistoryNode];
    }
    initiate() {
        return this.history[0].initiate();
    }
}
