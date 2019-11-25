export abstract class HistoryNode {
    prev: HistoryNode;
    abstract initiate();
    go_back() {
        this.prev.initiate();
    }
    open_new(next: HistoryNode) {
        next.initiate();
    }
}