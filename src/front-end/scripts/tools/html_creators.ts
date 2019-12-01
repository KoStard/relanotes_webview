export function generate_menu_buttons_list({
    header,
    textsAndCallbacks,
    addBackButton=false,
    backCallback
}: {
    header: string,
    textsAndCallbacks: Array<Array<any>>,
    addBackButton?: boolean | null,
    backCallback?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null
}): HTMLDivElement {
    let container = document.createElement('div');
    container.classList.add('container');

    let headerRow = document.createElement('div');
    headerRow.className = 'row pl-3 pr-3';
    let headerDiv = document.createElement('div');
    headerDiv.className = 'col-md-12 pt-4';

    if (addBackButton) {
        let backButtonDiv = document.createElement('div');
        backButtonDiv.className = 'float-left mb-2 h-100 w-15';
        let backButton = document.createElement('button');
        backButton.className = 'btn btn-secondary h-60 v-al-middle';
        backButton.innerText = '<';
        backButton.onclick = backCallback;

        backButtonDiv.appendChild(backButton);
        headerDiv.appendChild(backButtonDiv);
    }

    let headerP = document.createElement('p');
    headerP.className = 'h1 text-center w-75 ml-auto mr-auto text-truncate';
    headerP.innerText = header;
    headerDiv.appendChild(headerP);
    headerRow.appendChild(headerDiv);
    container.appendChild(headerRow);

    container.appendChild(document.createElement('hr'));

    let contentRow = document.createElement('div');
    contentRow.className = 'row p-3';
    for (let [text, callback] of textsAndCallbacks) {
        let col = document.createElement('div');
        col.className = 'col-md-3 col-lg-2 col-sm-4 p-1';
        let button = document.createElement('button');
        button.className = 'btn btn-success btn-block h-100 text-truncate';
        button.onclick = callback;
        button.innerText = text;
        button.type = 'button';
        col.appendChild(button);
        contentRow.appendChild(col);
    }
    container.appendChild(contentRow);
    return container;
}