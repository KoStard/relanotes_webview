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
        var GetGroupsButton = new Button("Get Names", function () {
            ipc.GetGroups();
        });
        this.container.appendChild(GetGroupsButton.element);
        var groupNamesContainer = document.createElement('div');
        this.groupNamesContainer = groupNamesContainer;
        this.container.appendChild(groupNamesContainer);
    }
    GUI.prototype.renderGroupNames = function (names) {
        this.groupNamesContainer.innerHTML = "";
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            var nameElement = document.createElement('span');
            nameElement.innerText = name_1;
            this.groupNamesContainer.appendChild(nameElement);
        }
    };
    return GUI;
}());
var IPC = /** @class */ (function () {
    function IPC(gui) {
        this.gui = gui;
    }
    IPC.prototype.render = function (names) {
        this.gui.renderGroupNames(names);
    };
    IPC.prototype.invoke = function (arg) {
        window.external.invoke(JSON.stringify(arg));
    };
    IPC.prototype.init = function () {
        this.invoke({
            cmd: "Init"
        });
    };
    IPC.prototype.GetGroups = function () {
        this.invoke({
            cmd: "GetGroups"
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
