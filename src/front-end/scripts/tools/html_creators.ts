export function generate_menu_buttons_list(texts_and_callbacks: Array<Array<any>>): HTMLDivElement {
    let container = document.createElement('div');
    container.classList.add('container');
    let row = document.createElement('div');
    row.classList.add('row');
    for (let [text, callback] of texts_and_callbacks) {
        let col = document.createElement('div');
        col.classList.add('col-md-2');
        let button = document.createElement('button');
        button.className = 'btn btn-success btn-block';
        button.onclick = callback;
        button.innerText = text;
        button.type = 'button';
        col.appendChild(button);
        row.appendChild(col);
    }
    container.appendChild(row);
    return container;
}