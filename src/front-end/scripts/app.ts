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
    constructor() {
        this.container = <HTMLDivElement> document.getElementById('container');
        let incrementButton = new Button(
            "Increment",
            () => {
                ipc.increment()
            }
        );
        let decrementButton = new Button(
            "Decrement",
            () => {
                ipc.decrement()
            }
        );
        this.countSpan = document.createElement('span');
        this.container.appendChild(incrementButton.element);
        this.container.appendChild(decrementButton.element);
        this.container.appendChild(this.countSpan);
    }

    updateCount(count: Number) {
        this.countSpan.innerText = count.toString();
    }
}

class IPC {
    gui: GUI;
    constructor(gui: GUI) { 
        this.gui = gui;
    }
    render(count) {
        console.log(count);
        this.gui.updateCount(count);
    }
    private invoke(arg) {
        (window.external as any).invoke(JSON.stringify(arg));
    }
    init() { 
        this.invoke({
            cmd: "Init"
        });
    }
    increment() {
        this.invoke({
            cmd: "Increment"
        });
    }
    decrement() {
        this.invoke({
            cmd: "Decrement"
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
