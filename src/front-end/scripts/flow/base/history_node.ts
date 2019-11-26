export abstract class HistoryNode {
    prev: HistoryNode;
    current_next: HistoryNode;
    abstract initiate();
    abstract stop();
    go_back() {
        this.prev.current_next = null;
        this.stop();
        this.prev.initiate();
    }
    open_new(next: HistoryNode) {
        if (this.current_next) this.current_next.stop();
        this.current_next = next;
        next.initiate();
    }
}
