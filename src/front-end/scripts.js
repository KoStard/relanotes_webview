var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
define("tools/tools", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function get_waiter() {
        var f;
        var p = new Promise(function (resolve) {
            f = function () {
                resolve.apply(void 0, __spread(arguments));
            };
        });
        return [f, p];
    }
    exports.get_waiter = get_waiter;
});
define("tools/commands", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Command = /** @class */ (function () {
        function Command(cmd, args) {
            this.cmd = cmd;
            this.args = args;
        }
        Command.prototype.serialize = function () {
            return __assign({ cmd: this.cmd }, this.args);
        };
        return Command;
    }());
    exports.Command = Command;
    var Init = /** @class */ (function (_super) {
        __extends(Init, _super);
        function Init() {
            return _super.call(this, "Init", {}) || this;
        }
        return Init;
    }(Command));
    exports.Init = Init;
    var GetGroups = /** @class */ (function (_super) {
        __extends(GetGroups, _super);
        function GetGroups() {
            return _super.call(this, "GetGroups", {}) || this;
        }
        return GetGroups;
    }(Command));
    exports.GetGroups = GetGroups;
    var GetSubGroups = /** @class */ (function (_super) {
        __extends(GetSubGroups, _super);
        function GetSubGroups(group_id) {
            return _super.call(this, "GetSubGroups", { group_id: group_id }) || this;
        }
        return GetSubGroups;
    }(Command));
    exports.GetSubGroups = GetSubGroups;
    var GetRootNodes = /** @class */ (function (_super) {
        __extends(GetRootNodes, _super);
        function GetRootNodes(subgroup_id) {
            return _super.call(this, "GetRootNodes", { subgroup_id: subgroup_id }) || this;
        }
        return GetRootNodes;
    }(Command));
    exports.GetRootNodes = GetRootNodes;
    var GetChildNodes = /** @class */ (function (_super) {
        __extends(GetChildNodes, _super);
        function GetChildNodes(subgroup_id, parent_id) {
            return _super.call(this, "GetChildNodes", { subgroup_id: subgroup_id, parent_id: parent_id }) || this;
        }
        return GetChildNodes;
    }(Command));
    exports.GetChildNodes = GetChildNodes;
});
define("tools/requests_registry", ["require", "exports", "tools/tools"], function (require, exports, tools_1) {
    "use strict";
    exports.__esModule = true;
    var RequestsRegistry = /** @class */ (function () {
        function RequestsRegistry() {
            this.requests = {};
        }
        RequestsRegistry.prototype.wait_for = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requests[id.toString()].p];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        RequestsRegistry.prototype.get_id_for_request = function () {
            return (new Date()).getTime() - Math.trunc(Math.random() * 1000);
        };
        RequestsRegistry.prototype.send_request = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var id, _a, f, p;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = this.get_id_for_request();
                            _a = __read(tools_1.get_waiter(), 2), f = _a[0], p = _a[1];
                            this.requests[id.toString()] = { f: f, p: p };
                            window.external.invoke(JSON.stringify(__assign({ request_id: id }, request)));
                            return [4 /*yield*/, this.wait_for(id)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        RequestsRegistry.prototype.send_command = function (command) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.send_request(command.serialize())];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        RequestsRegistry.prototype.put_response = function (id, msg) {
            // console.log("Got response", id, msg);
            this.requests[id.toString()].f(msg);
            delete this.requests[id.toString()];
        };
        return RequestsRegistry;
    }());
    exports.RequestsRegistry = RequestsRegistry;
});
define("flow/base/history_node", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var HistoryNodeState;
    (function (HistoryNodeState) {
        HistoryNodeState[HistoryNodeState["ACTIVE"] = 0] = "ACTIVE";
        HistoryNodeState[HistoryNodeState["STOPPED"] = 1] = "STOPPED";
        HistoryNodeState[HistoryNodeState["PAUSED"] = 2] = "PAUSED"; // Another node was opened, but this one is in the history
    })(HistoryNodeState = exports.HistoryNodeState || (exports.HistoryNodeState = {}));
    var HistoryNode = /** @class */ (function () {
        function HistoryNode() {
        }
        HistoryNode.prototype.goBack = function () {
            if (this.__prev) {
                this.__prev.__current_next = null;
                this.__stop();
                this.__prev.__initialize();
            }
        };
        HistoryNode.prototype.openNext = function (next) {
            if (this.__current_next) {
                this.__current_next.__stop();
            }
            this.__current_next = next;
            next.__prev = this;
            next.__initialize();
            this.state = HistoryNodeState.PAUSED;
        };
        HistoryNode.prototype.__stop = function () {
            this.state = HistoryNodeState.STOPPED;
            this.stop();
        };
        HistoryNode.prototype.__initialize = function () {
            var _this = this;
            this.state = HistoryNodeState.ACTIVE;
            this.initiate();
            document.addEventListener('keyup', function (event) {
                if (event.keyCode == 27 && _this.state == HistoryNodeState.ACTIVE) {
                    _this.goBack();
                }
            });
        };
        return HistoryNode;
    }());
    exports.HistoryNode = HistoryNode;
});
define("tools/html_creators", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function generateMenuButtonsList(_a) {
        var e_1, _b;
        var header = _a.header, textsAndCallbacks = _a.textsAndCallbacks, _c = _a.addBackButton, addBackButton = _c === void 0 ? false : _c, backCallback = _a.backCallback;
        var container = document.createElement("div");
        container.classList.add("container");
        var headerRow = document.createElement("div");
        headerRow.className = "row pl-3 pr-3";
        var headerDiv = document.createElement("div");
        headerDiv.className = "col-md-12 pt-4";
        if (addBackButton) {
            var backButtonDiv = document.createElement("div");
            backButtonDiv.className = "float-left mb-2 h-100 w-15";
            var backButton = document.createElement("button");
            backButton.className = "btn btn-secondary h-60 v-al-middle";
            backButton.innerText = "<";
            backButton.onclick = backCallback;
            backButtonDiv.appendChild(backButton);
            headerDiv.appendChild(backButtonDiv);
        }
        var headerP = document.createElement("p");
        headerP.className = "h1 text-center w-75 ml-auto mr-auto text-truncate";
        headerP.innerText = header;
        headerDiv.appendChild(headerP);
        headerRow.appendChild(headerDiv);
        container.appendChild(headerRow);
        container.appendChild(document.createElement("hr"));
        var contentRow = document.createElement("div");
        contentRow.className = "row p-3";
        try {
            for (var _d = __values(textsAndCallbacks.entries()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), index = _f[0], _g = __read(_f[1], 2), text = _g[0], callback = _g[1];
                var col = document.createElement("div");
                col.className = "col-md-3 col-lg-2 col-sm-4 col-6 p-1";
                var button = document.createElement("button");
                button.className = "btn btn-success btn-block h-100 text-truncate";
                button.onclick = callback;
                button.innerText = text;
                button.type = "button";
                col.appendChild(button);
                contentRow.appendChild(col);
                if (index == 0) {
                    // The first group/subgroup will be automatically selected
                    button.autofocus = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_b = _d["return"])) _b.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        container.appendChild(contentRow);
        return container;
    }
    exports.generateMenuButtonsList = generateMenuButtonsList;
    function generateNodeDetailedView(_a) {
        var e_2, _b, e_3, _c;
        var backCallback = _a.backCallback, absolutePath = _a.absolutePath, pathClickCallback = _a.pathClickCallback, childrenNodes = _a.childrenNodes, childClickCallback = _a.childClickCallback, addClickCallback = _a.addClickCallback, deleteClickCallback = _a.deleteClickCallback, onNameChange = _a.onNameChange, onDesriptionChange = _a.onDesriptionChange, currentNode = _a.currentNode, activateInputs = _a.activateInputs, activateAddButton = _a.activateAddButton, activateDeleteButton = _a.activateDeleteButton;
        var container = document.createElement("div");
        container.className =
            "container-fluid overflow-hidden d-none d-flex flex-column fill-absolute";
        var headerDiv = document.createElement("div");
        headerDiv.className = "row pb-3 flex-shrink-0";
        var headerFlexRow = document.createElement("div");
        headerFlexRow.className = "d-flex flex-row bd-highlight w-100 breadcrumb-background";
        var backButton = document.createElement("button");
        backButton.className = "btn btn-secondary v-al-middle ml-2 fit-content";
        backButton.innerText = "<";
        backButton.onclick = backCallback;
        headerFlexRow.appendChild(backButton);
        var breadcrumbNav = document.createElement("nav");
        breadcrumbNav.className = "w-100";
        var breadcrumbOl = document.createElement("ol");
        breadcrumbOl.className = "w-100 breadcrumb m-0";
        var currentNodeBreadcrumbLi;
        try {
            for (var _d = __values(absolutePath.entries()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), index = _f[0], pathNode = _f[1];
                var breadcrumbLi = document.createElement("li");
                if (index == absolutePath.length - 1) {
                    currentNodeBreadcrumbLi = breadcrumbLi;
                    breadcrumbLi.className = "breadcrumb-item active";
                    breadcrumbLi.attributes["aria-current"] = "page";
                    breadcrumbLi.innerText = pathNode.getLabel();
                }
                else {
                    breadcrumbLi.className = "breadcrumb-item";
                    var breadcrumbA = document.createElement("a");
                    breadcrumbA.href = "#";
                    breadcrumbA.innerText = pathNode.getLabel();
                    breadcrumbA.onclick = pathClickCallback;
                    breadcrumbLi.appendChild(breadcrumbA);
                }
                breadcrumbOl.appendChild(breadcrumbLi);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_b = _d["return"])) _b.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        breadcrumbOl.appendChild(currentNodeBreadcrumbLi);
        breadcrumbNav.appendChild(breadcrumbOl);
        headerFlexRow.appendChild(breadcrumbNav);
        headerDiv.appendChild(headerFlexRow);
        container.appendChild(headerDiv);
        var contentDiv = document.createElement("div");
        contentDiv.className = "row h-100 pb-3";
        var childrenDiv = document.createElement("div");
        childrenDiv.className = "col-6 h-100 overflow-scrollable-auto pt-1 pb-1";
        try {
            for (var _g = __values(childrenNodes.entries()), _h = _g.next(); !_h.done; _h = _g.next()) {
                var _j = __read(_h.value, 2), index = _j[0], child = _j[1];
                var childButton = document.createElement("button");
                childButton.className = "w-100 btn btn-outline-secondary mb-3";
                childButton.innerText = child.name;
                childButton.onclick = childClickCallback;
                childButton.dataset.id = child.id;
                childrenDiv.appendChild(childButton);
                if (!activateInputs && index == 0) {
                    childButton.autofocus = true; // The first child node button will be focued if the inputs are disabled
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_c = _g["return"])) _c.call(_g);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var addButton = document.createElement("button");
        addButton.className = "w-100 btn btn-outline-success mb-3";
        addButton.innerText = "Add";
        addButton.onclick = addClickCallback;
        childrenDiv.appendChild(addButton);
        if (activateAddButton) {
            if (!childrenNodes.length && !activateInputs) {
                // When the inputs are disabled and there is no children the add button will be activated
                addButton.autofocus = true;
            }
        }
        else {
            addButton.disabled = true;
        }
        var deleteButton = document.createElement("button");
        deleteButton.className = "w-100 btn btn-outline-danger mb-3";
        deleteButton.innerText = "Delete";
        deleteButton.onclick = deleteClickCallback;
        childrenDiv.appendChild(deleteButton);
        if (!activateDeleteButton) {
            deleteButton.disabled = true;
        }
        contentDiv.appendChild(childrenDiv);
        var detailsDiv = document.createElement("div");
        detailsDiv.className = "col-6 h-100 d-none d-flex flex-column pt-1";
        var nameInput = document.createElement("input");
        nameInput.className = "form-control mb-3 text-truncate";
        detailsDiv.appendChild(nameInput);
        var descriptionTextarea = document.createElement("textarea");
        descriptionTextarea.className = "form-control flex-grow-1";
        if (!activateInputs) {
            nameInput.disabled = true;
            descriptionTextarea.disabled = true;
        }
        else {
            nameInput.autofocus = true;
            if (!currentNode) {
                descriptionTextarea.disabled = true;
            }
        }
        nameInput.onchange = function (event) {
            if (nameInput.value) {
                descriptionTextarea.classList.remove("inactive");
            }
            else {
                descriptionTextarea.disabled = true;
                if (currentNode && currentNode.name) {
                    nameInput.value = currentNode.name;
                    return;
                }
            }
            onNameChange(event);
            currentNodeBreadcrumbLi.innerText = nameInput.value;
        };
        descriptionTextarea.onchange = onDesriptionChange;
        detailsDiv.appendChild(descriptionTextarea);
        contentDiv.appendChild(detailsDiv);
        container.appendChild(contentDiv);
        return container;
    }
    exports.generateNodeDetailedView = generateNodeDetailedView;
});
define("flow/node_detailed_view", ["require", "exports", "flow/base/history_node", "tools/html_creators", "tools/commands"], function (require, exports, history_node_1, html_creators_1, commands_1) {
    "use strict";
    exports.__esModule = true;
    var NodeDetailedView = /** @class */ (function (_super) {
        __extends(NodeDetailedView, _super);
        function NodeDetailedView(_a) {
            var node = _a.node, parent_id = _a.parent_id, subgroup_id = _a.subgroup_id, path = _a.path;
            var _this = _super.call(this) || this;
            _this.node = node;
            _this.parent_id = node ? node.associated_node_id : parent_id;
            _this.subgroup_id = subgroup_id;
            _this.currentPathNode = new PathNode({
                isRoot: !path.length,
                node: _this.node
            });
            path.push(_this.currentPathNode);
            _this.path = path;
            return _this;
        }
        NodeDetailedView.prototype.initiate = function () {
            var container = document.getElementById("container");
            console.log("Initialized");
            this.render(container);
        };
        NodeDetailedView.prototype.render = function (container) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, fragment;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.loadChildren()];
                        case 1:
                            _a.nodes = _b.sent();
                            fragment = document.createDocumentFragment();
                            fragment.appendChild(html_creators_1.generateNodeDetailedView({
                                backCallback: function () { return _this.goBack(); },
                                absolutePath: this.path,
                                pathClickCallback: function () { console.log("Path click", arguments); },
                                childrenNodes: this.nodes,
                                childClickCallback: function (e) { return _this.openNode(_this.nodes.find(function (node) { return node.id == e.currentTarget.dataset.id; })); },
                                addClickCallback: function () { return _this.addChild(); },
                                deleteClickCallback: function () { return _this.deleteNode(); },
                                onNameChange: function () { return _this.updateName(); },
                                onDesriptionChange: function () { return _this.updateDescription(); },
                                currentNode: this.node,
                                activateInputs: !this.isRoot(),
                                activateAddButton: this.canHaveChildren(),
                                activateDeleteButton: Boolean(this.node)
                            }));
                            container.innerHTML = "";
                            container.appendChild(fragment);
                            return [2 /*return*/];
                    }
                });
            });
        };
        NodeDetailedView.prototype.isRoot = function () {
            return !this.node && this.path.length == 1;
        };
        NodeDetailedView.prototype.canHaveChildren = function () {
            return this.isRoot() || this.node;
        };
        NodeDetailedView.prototype.openNode = function (node) {
            // Increment the path here
            var childNodeView = new NodeDetailedView({
                node: node,
                path: this.path.concat(node.name),
                subgroup_id: this.subgroup_id
            });
            this.openNext(childNodeView);
        };
        NodeDetailedView.prototype.addChild = function () {
            // Will create a temporary view without a node - will create node only when name is inputted
            // This can be used only if you are in the root or you have opened an existing node
            if (!this.canHaveChildren()) {
                throw new Error("This node can't have a child het!");
            }
            var childNodeView = new NodeDetailedView({
                path: __spread(this.path),
                subgroup_id: this.subgroup_id
            });
            this.openNext(childNodeView);
        };
        NodeDetailedView.prototype.deleteNode = function () {
        };
        NodeDetailedView.prototype.updateName = function () {
        };
        NodeDetailedView.prototype.updateDescription = function () {
        };
        NodeDetailedView.prototype.findNodeViewFromHistory = function (node_id) {
            if (this.node && this.node.id == node_id) {
                return this;
            }
            if (this.__prev instanceof NodeDetailedView) {
                return this.__prev.findNodeViewFromHistory(node_id);
            }
            throw new Error("Could not find node from history with id " + node_id);
        };
        NodeDetailedView.prototype.loadChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.node) return [3 /*break*/, 2];
                            // Just showing the parents
                            console.log("Will load children", this.subgroup_id);
                            return [4 /*yield*/, window.ipc.rr.send_command(new commands_1.GetChildNodes(this.subgroup_id, this.node.id))];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            if (!this.parent_id) return [3 /*break*/, 3];
                            return [3 /*break*/, 6];
                        case 3:
                            if (!this.subgroup_id) return [3 /*break*/, 5];
                            return [4 /*yield*/, window.ipc.rr.send_command(new commands_1.GetRootNodes(this.subgroup_id))];
                        case 4: 
                        // Viewing the root of the subgroup
                        return [2 /*return*/, _a.sent()];
                        case 5: throw new Error("Trying to load uninitialized node detailed view.");
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NodeDetailedView.prototype.stop = function () { };
        return NodeDetailedView;
    }(history_node_1.HistoryNode));
    exports.NodeDetailedView = NodeDetailedView;
    var PathNode = /** @class */ (function () {
        function PathNode(_a) {
            var _b = _a.isRoot, isRoot = _b === void 0 ? false : _b, node = _a.node;
            this.isRoot = isRoot;
            this.node = node;
        }
        PathNode.prototype.getLabel = function () {
            if (this.isRoot)
                return "root";
            if (this.node)
                return this.node.name;
            return '';
        };
        return PathNode;
    }());
    exports.PathNode = PathNode;
});
// Maybe create node class
define("flow/subgroups_view", ["require", "exports", "flow/base/history_node", "tools/commands", "tools/html_creators", "flow/node_detailed_view"], function (require, exports, history_node_2, commands_2, html_creators_2, node_detailed_view_1) {
    "use strict";
    exports.__esModule = true;
    var SubGroupsView = /** @class */ (function (_super) {
        __extends(SubGroupsView, _super);
        function SubGroupsView(group_id) {
            var _this = _super.call(this) || this;
            _this.group_id = group_id;
            return _this;
        }
        SubGroupsView.prototype.initiate = function () {
            var container = document.getElementById("container");
            this.render(container);
        };
        SubGroupsView.prototype.render = function (container) {
            return __awaiter(this, void 0, void 0, function () {
                var fragment, _a, _b, _c, _d;
                var _this = this;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            fragment = document.createDocumentFragment();
                            _b = (_a = fragment).appendChild;
                            _c = html_creators_2.generateMenuButtonsList;
                            _d = {
                                header: "Select a subgroup"
                            };
                            return [4 /*yield*/, this.loadSubGroups()];
                        case 1:
                            _b.apply(_a, [_c.apply(void 0, [(_d.textsAndCallbacks = (_e.sent()).map(function (group) { return [
                                        group.name,
                                        function () {
                                            if (_this.state == history_node_2.HistoryNodeState.ACTIVE) {
                                                // you have group id here
                                                _this.openSubGroup(group.id);
                                            }
                                        }
                                    ]; }),
                                        _d.addBackButton = true,
                                        _d.backCallback = function () {
                                            _this.goBack();
                                        },
                                        _d)])]);
                            container.innerHTML = "";
                            container.appendChild(fragment);
                            return [2 /*return*/];
                    }
                });
            });
        };
        SubGroupsView.prototype.loadSubGroups = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, window.ipc.rr.send_command(new commands_2.GetSubGroups(this.group_id))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        SubGroupsView.prototype.openSubGroup = function (subgroup_id) {
            this.openNext(new node_detailed_view_1.NodeDetailedView({ subgroup_id: subgroup_id, path: [] }));
        };
        SubGroupsView.prototype.stop = function () { };
        return SubGroupsView;
    }(history_node_2.HistoryNode));
    exports.SubGroupsView = SubGroupsView;
});
define("flow/groups_view", ["require", "exports", "flow/base/history_node", "tools/commands", "flow/subgroups_view", "tools/html_creators"], function (require, exports, history_node_3, commands_3, subgroups_view_1, html_creators_3) {
    "use strict";
    exports.__esModule = true;
    var GroupsView = /** @class */ (function (_super) {
        __extends(GroupsView, _super);
        function GroupsView() {
            return _super.call(this) || this;
        }
        GroupsView.prototype.initiate = function () {
            var container = document.getElementById("container");
            this.render(container);
        };
        GroupsView.prototype.render = function (container) {
            return __awaiter(this, void 0, void 0, function () {
                var fragment, _a, _b, _c, _d;
                var _this = this;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            fragment = document.createDocumentFragment();
                            _b = (_a = fragment).appendChild;
                            _c = html_creators_3.generateMenuButtonsList;
                            _d = {
                                header: "Select a group"
                            };
                            return [4 /*yield*/, this.loadGroups()];
                        case 1:
                            _b.apply(_a, [_c.apply(void 0, [(_d.textsAndCallbacks = (_e.sent()).map(function (group) { return [group.name, function () {
                                            if (_this.state == history_node_3.HistoryNodeState.ACTIVE) {
                                                // you have group id here
                                                _this.openGroup(group.id);
                                            }
                                        }]; }),
                                        _d)])]);
                            container.innerHTML = "";
                            container.appendChild(fragment);
                            return [2 /*return*/];
                    }
                });
            });
        };
        GroupsView.prototype.loadGroups = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, window.ipc.rr.send_command(new commands_3.GetGroups())];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        GroupsView.prototype.openGroup = function (group_id) {
            this.openNext(new subgroups_view_1.SubGroupsView(group_id));
        };
        GroupsView.prototype.stop = function () {
        };
        return GroupsView;
    }(history_node_3.HistoryNode));
    exports.GroupsView = GroupsView;
});
// Compile with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts
define("app", ["require", "exports", "tools/requests_registry", "tools/commands", "flow/groups_view"], function (require, exports, requests_registry_1, commands_4, groups_view_1) {
    "use strict";
    exports.__esModule = true;
    var IPC = /** @class */ (function () {
        function IPC() {
            // Maybe add central database here - if we need to store it in the front-end
            this.rr = new requests_registry_1.RequestsRegistry();
        }
        return IPC;
    }());
    {
        // Initializing the app
        var ipc = new IPC();
        window.ipc = ipc; // Saving reference in window
        ipc.rr.send_command(new commands_4.Init()).then(function () { return console.log("Got initial response"); });
        var groups_view = new groups_view_1.GroupsView();
        groups_view.__initialize();
    }
});
