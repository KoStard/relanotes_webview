export enum HistoryNodeState {
    ACTIVE,
    STOPPED,
    PAUSED // Another node was opened, but this one is in the history
}

export abstract class HistoryNode {
    __prev: HistoryNode;
    __current_next: HistoryNode;
    state: HistoryNodeState;
    abstract initiate();
    abstract stop();
    goBack() {
        if (this.__prev) {
            this.__prev.__current_next = null;
            this.__stop();
            this.__prev.__initialize();
        }
    }
    openNext(next: HistoryNode) {
        if (this.__current_next) { this.__current_next.__stop(); }
        this.__current_next = next;
        next.__prev = this;
        next.__initialize();
        this.state = HistoryNodeState.PAUSED;
    }
    __stop() {
        this.state = HistoryNodeState.STOPPED;
        this.stop();
    }
    __initialize() {
        this.state = HistoryNodeState.ACTIVE;
        this.initiate();
        document.addEventListener('keyup', event => {
            if (event.keyCode == 27 && this.state == HistoryNodeState.ACTIVE) {
                this.goBack();
            }
        });
    }
}
