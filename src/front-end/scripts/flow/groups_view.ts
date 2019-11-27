import { HistoryNode } from "./base/history_node";
import { GetGroups } from "../tools/commands";

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
        let buttonsContainer = document.createElement('div');
        buttonsContainer.id = 
        (await this.loadGroups()).forEach(group => {
            let b = document.createElement('button');
            b.innerText = group;
            b.classList = 
            b.onclick = () => {

            };
            fragment.appendChild(b);
        });
        container.appendChild(fragment);
    }
    async loadGroups() {
        return await (window as any).ipc.rr.send_command(new GetGroups());
    }
    stop() {

    }
}
