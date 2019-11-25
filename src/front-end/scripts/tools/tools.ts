export function get_waiter() {
    let f;
    let p = new Promise((resolve) => {
        f = function() {
            resolve(...arguments);
        }
    });
    return [f, p];
}