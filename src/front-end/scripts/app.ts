// Compile with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts

// Or compile and run with this command
// tsc --outFile src/front-end/scripts.js --module amd src/front-end/scripts/app.ts && cargo run

import { RequestsRegistry } from "./tools/requests_registry";
import { Init, GetGroups } from "./tools/commands";
import { GroupsView } from "./flow/groups_view";
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

    let groups_view = new GroupsView();
    groups_view.__initialize();
}
