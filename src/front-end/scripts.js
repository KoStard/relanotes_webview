// Compile with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts
// Or compile and run with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts && cargo run
var Button = /** @class */ (function () {
    function Button(text, onclick) {
        this.element = document.createElement('button');
        this.element.innerText = text;
        this.element.onclick = onclick;
    }
    return Button;
}());
var GUI = /** @class */ (function () {
    function GUI() {
        this.container = document.getElementById('container');
        var incrementButton = new Button("Increment", function () {
            ipc.increment();
        });
        var decrementButton = new Button("Decrement", function () {
            ipc.decrement();
        });
        this.countSpan = document.createElement('span');
        this.container.appendChild(incrementButton.element);
        this.container.appendChild(decrementButton.element);
        this.container.appendChild(this.countSpan);
    }
    GUI.prototype.updateCount = function (count) {
        this.countSpan.innerText = count.toString();
    };
    return GUI;
}());
var IPC = /** @class */ (function () {
    function IPC(gui) {
        this.gui = gui;
    }
    IPC.prototype.render = function (count) {
        console.log(count);
        this.gui.updateCount(count);
    };
    IPC.prototype.invoke = function (arg) {
        window.external.invoke(JSON.stringify(arg));
    };
    IPC.prototype.init = function () {
        this.invoke({
            cmd: "Init"
        });
    };
    IPC.prototype.increment = function () {
        this.invoke({
            cmd: "Increment"
        });
    };
    IPC.prototype.decrement = function () {
        this.invoke({
            cmd: "Decrement"
        });
    };
    return IPC;
}());
var ipc;
window.onload = function () {
    var gui = new GUI();
    ipc = new IPC(gui);
    ipc.init();
};
