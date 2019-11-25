// Compile with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts

// Or compile and run with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts && cargo run

import { get_waiter } from "./tools";

class Button { 
    element: HTMLButtonElement;
    constructor(text, onclick) {
        this.element = document.createElement('button');
        this.element.innerText = text;
        this.element.onclick = onclick;
    }
}

class GUI {
    container: HTMLDivElement;
    countSpan: HTMLSpanElement;
    groupNamesContainer: HTMLDivElement;
    constructor() {
        this.container = <HTMLDivElement> document.getElementById('container');
        let getGroupsButton = new Button("Get Names", () => {
            ipc.GetGroups().then(console.log);
        });
        this.container.appendChild(getGroupsButton.element);

        let groupNamesContainer = document.createElement('div');
        this.groupNamesContainer = groupNamesContainer;
        this.container.appendChild(groupNamesContainer);
    }

    renderGroupNames(names: Array<string>) {
        this.groupNamesContainer.innerHTML = "";
        for (let name of names) {
            let nameElement = document.createElement('span');
            nameElement.innerText = name;
            this.groupNamesContainer.appendChild(nameElement);
        }
    }
}

class RequestsRegistry {
    requests: object;
    constructor() { 
        this.requests = {};
    }
    async wait_for(id: Number) {
        await this.requests[id.toString()].p;
    }
    private get_id_for_request() {
        return (new Date()).getTime();
    }
    async send_request(request: object) {
        let id = this.get_id_for_request();
        let [f, p] = get_waiter();
        this.requests[id.toString()] = { f, p };
        (window.external as any).invoke(JSON.stringify(request));
        return await this.wait_for(id);
    }
    put_response(id: Number, msg) {
        this.requests[id.toString()].f(msg);
    }
}

class IPC {
    gui: GUI;
    req_reg: RequestsRegistry;
    constructor(gui: GUI) { 
        this.gui = gui;
        this.req_reg = new RequestsRegistry();
    }
    init() {
        return this.req_reg.send_request({
            cmd: "Init"
        });
    }
    GetGroups() {
        return this.req_reg.send_request({
            cmd: "GetGroups"
        });
    }
}

var ipc;
window.onload = function () {
    let gui = new GUI();
    ipc = new IPC(
        gui
    )
    ipc.init();
}
