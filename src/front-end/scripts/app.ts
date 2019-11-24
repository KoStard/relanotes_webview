// Compile with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts

// Or compile and run with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts && cargo run

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
        let getNamesButton = new Button("Get Names", () => {
            ipc.getNames();
        });
        this.container.appendChild(getNamesButton.element);

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
    gui: GUI;
    constructor(gui: GUI) { 
        this.gui = gui;
    }
    render(names) {
        this.gui.renderGroupNames(names);
    }
    private invoke(arg) {
        (window.external as any).invoke(JSON.stringify(arg));
    }
    init() {
        this.invoke({
            cmd: "Init"
        });
    }
    getNames() {
        this.invoke({
            cmd: "GetNames"
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
