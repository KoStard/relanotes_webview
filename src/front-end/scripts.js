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
    })(HistoryNodeState = exports.HistoryNodeState || (exports.HistoryNodeState = {}));
    var HistoryNode = /** @class */ (function () {
        function HistoryNode() {
        }
        HistoryNode.prototype.goBack = function () {
            this.__prev.__current_next = null;
            this.__stop();
            this.__prev.__initialize();
        };
        HistoryNode.prototype.openNext = function (next) {
            if (this.__current_next) {
                this.__current_next.__stop();
            }
            this.__current_next = next;
            next.__prev = this;
            next.__initialize();
        };
        HistoryNode.prototype.__stop = function () {
            this.state = HistoryNodeState.STOPPED;
            this.stop();
        };
        HistoryNode.prototype.__initialize = function () {
            this.state = HistoryNodeState.ACTIVE;
            this.initiate();
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
            for (var textsAndCallbacks_1 = __values(textsAndCallbacks), textsAndCallbacks_1_1 = textsAndCallbacks_1.next(); !textsAndCallbacks_1_1.done; textsAndCallbacks_1_1 = textsAndCallbacks_1.next()) {
                var _d = __read(textsAndCallbacks_1_1.value, 2), text = _d[0], callback = _d[1];
                var col = document.createElement("div");
                col.className = "col-md-3 col-lg-2 col-sm-4 col-6 p-1";
                var button = document.createElement("button");
                button.className = "btn btn-success btn-block h-100 text-truncate";
                button.onclick = callback;
                button.innerText = text;
                button.type = "button";
                col.appendChild(button);
                contentRow.appendChild(col);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (textsAndCallbacks_1_1 && !textsAndCallbacks_1_1.done && (_b = textsAndCallbacks_1["return"])) _b.call(textsAndCallbacks_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        container.appendChild(contentRow);
        return container;
    }
    exports.generateMenuButtonsList = generateMenuButtonsList;
    function generateNodeDetailedView() { }
    exports.generateNodeDetailedView = generateNodeDetailedView;
});
define("flow/node_detailed_view", ["require", "exports", "flow/base/history_node", "tools/commands"], function (require, exports, history_node_1, commands_1) {
    "use strict";
    exports.__esModule = true;
    var NodeDetailedView = /** @class */ (function (_super) {
        __extends(NodeDetailedView, _super);
        function NodeDetailedView(_a) {
            var node = _a.node, parent_id = _a.parent_id, subgroup_id = _a.subgroup_id;
            var _this = _super.call(this) || this;
            _this.node = node;
            _this.parent_id = parent_id;
            _this.subgroup_id = subgroup_id;
            console.log(node);
            return _this;
        }
        NodeDetailedView.prototype.initiate = function () {
            var container = document.getElementById("container");
            this.render(container);
        };
        NodeDetailedView.prototype.render = function (container) {
            return __awaiter(this, void 0, void 0, function () {
                var fragment, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            fragment = document.createDocumentFragment();
                            // fragment.appendChild(generateMenuButtonsList(
                            // ));
                            _b = (_a = console).log;
                            return [4 /*yield*/, this.loadChildren()];
                        case 1:
                            // fragment.appendChild(generateMenuButtonsList(
                            // ));
                            _b.apply(_a, [_c.sent()]);
                            container.innerHTML = "";
                            container.appendChild(fragment);
                            return [2 /*return*/];
                    }
                });
            });
        };
        NodeDetailedView.prototype.openNode = function (node) { };
        NodeDetailedView.prototype.loadChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.node) return [3 /*break*/, 1];
                            return [3 /*break*/, 5];
                        case 1:
                            if (!this.parent_id) return [3 /*break*/, 2];
                            return [3 /*break*/, 5];
                        case 2:
                            if (!this.subgroup_id) return [3 /*break*/, 4];
                            return [4 /*yield*/, window.ipc.rr.send_command(new commands_1.GetRootNodes(this.subgroup_id))];
                        case 3: 
                        // Viewing the root of the subgroup
                        return [2 /*return*/, _a.sent()];
                        case 4: throw new Error("Trying to load uninitialized node detailed view.");
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NodeDetailedView.prototype.stop = function () { };
        return NodeDetailedView;
    }(history_node_1.HistoryNode));
    exports.NodeDetailedView = NodeDetailedView;
});
define("flow/subgroups_view", ["require", "exports", "flow/base/history_node", "tools/commands", "tools/html_creators", "flow/node_detailed_view"], function (require, exports, history_node_2, commands_2, html_creators_1, node_detailed_view_1) {
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
                            _c = html_creators_1.generateMenuButtonsList;
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
                        case 0:
                            console.log("Loading", this.group_id);
                            return [4 /*yield*/, window.ipc.rr.send_command(new commands_2.GetSubGroups(this.group_id))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        SubGroupsView.prototype.openSubGroup = function (subgroup_id) {
            this.openNext(new node_detailed_view_1.NodeDetailedView({ subgroup_id: subgroup_id }));
        };
        SubGroupsView.prototype.stop = function () { };
        return SubGroupsView;
    }(history_node_2.HistoryNode));
    exports.SubGroupsView = SubGroupsView;
});
define("flow/groups_view", ["require", "exports", "flow/base/history_node", "tools/commands", "flow/subgroups_view", "tools/html_creators"], function (require, exports, history_node_3, commands_3, subgroups_view_1, html_creators_2) {
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
                            _c = html_creators_2.generateMenuButtonsList;
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
