import { get_waiter } from "./tools";
import { Command } from "./commands";

export class RequestsRegistry {
    requests: object;
    constructor() {
        this.requests = {};
    }
    async wait_for(id: Number) {
        return await this.requests[id.toString()].p;
    }
    private get_id_for_request() {
        return (new Date()).getTime() - Math.trunc(Math.random() * 1000);
    }
    async send_request(request: object) {
        let id = this.get_id_for_request();
        let [f, p] = get_waiter();
        this.requests[id.toString()] = { f, p };
        (window.external as any).invoke(JSON.stringify({ request_id: id, ...request }));
        return await this.wait_for(id);
    }
    async send_command(command: Command) {
        return await this.send_request(command.serialize());
    }
    put_response(id: Number, msg) {
        console.warn("Got response", id, msg);
        this.requests[id.toString()].f(JSON.parse(msg));
        delete this.requests[id.toString()];
    }
}