export function get_waiter() {
    let f;
    let p = new Promise((resolve) => {
        f = () => {
            resolve()
        }
    });
    return [f, p];
}