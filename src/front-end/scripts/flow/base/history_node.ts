export abstract class HistoryNode {
    __prev: HistoryNode;
    __current_next: HistoryNode;
    abstract initiate();
    abstract stop();
    go_back() {
        this.__prev.__current_next = null;
        this.stop();
        this.__prev.initiate();
    }
    open_next(next: HistoryNode) {
        if (this.__current_next) this.__current_next.stop();
        this.__current_next = next;
        next.initiate();
    }
}
