// Compile with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts

// Or compile and run with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts && cargo run

import { RequestsRegistry } from "./tools/requests_registry";
import { Init, GetGroups } from "./tools/commands";
// import "./html";
import {GroupsView} from "./flow/groups_view";

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
        this.container = <HTMLDivElement>document.getElementById('container');
        let getGroupsButton = new Button("Get Names", () => {
            (window as any).ipc.rr.send_command(new GetGroups()).then((names) => {
                this.renderGroupNames(names);
            });
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

class IPC {
    rr: RequestsRegistry;
    constructor() {
        // Maybe add central database here - if we need to store it in the front-end
        this.rr = new RequestsRegistry();
    }
}

{
    // Initializing the app
    let ipc = new IPC();
    (window as any).ipc = ipc; // Saving reference in window
    ipc.rr.send_command(new Init()).then(() => console.log("Got initial response"));
}