export function generateMenuButtonsList({
    header,
    textsAndCallbacks,
    addBackButton = false,
    backCallback
}: {
    header: string;
    textsAndCallbacks: Array<Array<any>>;
    addBackButton?: boolean | null;
    backCallback?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
}): HTMLDivElement {
    let container = document.createElement("div");
    container.classList.add("container");

    let headerRow = document.createElement("div");
    headerRow.className = "row pl-3 pr-3";
    let headerDiv = document.createElement("div");
    headerDiv.className = "col-md-12 pt-4";

    if (addBackButton) {
        let backButtonDiv = document.createElement("div");
        backButtonDiv.className = "float-left mb-2 h-100 w-15";
        let backButton = document.createElement("button");
        backButton.className = "btn btn-secondary h-60 v-al-middle";
        backButton.innerText = "<";
        backButton.onclick = backCallback;

        backButtonDiv.appendChild(backButton);
        headerDiv.appendChild(backButtonDiv);
    }

    let headerP = document.createElement("p");
    headerP.className = "h1 text-center w-75 ml-auto mr-auto text-truncate";
    headerP.innerText = header;
    headerDiv.appendChild(headerP);
    headerRow.appendChild(headerDiv);
    container.appendChild(headerRow);

    container.appendChild(document.createElement("hr"));

    let contentRow = document.createElement("div");
    contentRow.className = "row p-3";
    for (let [index, [text, callback]] of textsAndCallbacks.entries()) {
        let col = document.createElement("div");
        col.className = "col-md-3 col-lg-2 col-sm-4 col-6 p-1";
        let button = document.createElement("button");
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
    container.appendChild(contentRow);
    return container;
}

export function generateNodeDetailedView({
    backCallback,
    absolutePath,
    pathClickCallback,
    childrenNodes,
    childClickCallback,
    addClickCallback,
    deleteClickCallback,
    onNameChange,
    onDesriptionChange,
    currentNode,
    activateInputs,
    activateAddButton,
    activateDeleteButton
}) // : {
// backCallback,
// absolutePath,
// pathClickCallback,
// childrenNodes,
// childClickCallback,
// addClickCallback,
// deleteClickCallback
// }
{
    let container = document.createElement("div");
    container.className =
        "container-fluid overflow-hidden d-none d-flex flex-column fill-absolute";
    let headerDiv = document.createElement("div");
    headerDiv.className = "row pb-3 flex-shrink-0";
    let headerFlexRow = document.createElement("div");
    headerFlexRow.className = "d-flex flex-row bd-highlight w-100 breadcrumb-background";
    let backButton = document.createElement("button");
    backButton.className = "btn btn-secondary v-al-middle ml-2 fit-content";
    backButton.innerText = "<";
    backButton.onclick = backCallback;
    headerFlexRow.appendChild(backButton);

    let breadcrumbNav = document.createElement("nav");
    breadcrumbNav.className = "w-100";
    let breadcrumbOl = document.createElement("ol");
    breadcrumbOl.className = "w-100 breadcrumb m-0";

    for (let pathNode of absolutePath) {
        let breadcrumbLi = document.createElement("li");
        breadcrumbLi.className = "breadcrumb-item";
        let breadcrumbA = document.createElement("a");
        breadcrumbA.href = "#";
        breadcrumbA.innerText = pathNode;
        breadcrumbA.onclick = pathClickCallback;
        breadcrumbLi.appendChild(breadcrumbA);
        breadcrumbOl.appendChild(breadcrumbLi);
    }

    let currentNodeBreadcrumbLi = document.createElement("li");
    currentNodeBreadcrumbLi.className = "breadcrumb-item active";
    currentNodeBreadcrumbLi.attributes["aria-current"] = "page";

    currentNodeBreadcrumbLi.innerText = absolutePath
        ? currentNode
            ? currentNode.name
            : ""
        : "root";
    breadcrumbOl.appendChild(currentNodeBreadcrumbLi);

    breadcrumbNav.appendChild(breadcrumbOl);
    headerFlexRow.appendChild(breadcrumbNav);
    headerDiv.appendChild(headerFlexRow);
    container.appendChild(headerDiv);

    let contentDiv = document.createElement("div");
    contentDiv.className = "row h-100 pb-3";
    let childrenDiv = document.createElement("div");
    childrenDiv.className = "col-6 h-100 overflow-scrollable-auto pt-1 pb-1";

    for (let [index, child] of childrenNodes.entries()) {
        let childButton = document.createElement("button");
        childButton.className = "w-100 btn btn-outline-secondary mb-3";
        childButton.innerText = child.name;
        childButton.onclick = childClickCallback;
        childButton.dataset.id = child.id;
        childrenDiv.appendChild(childButton);

        if (!activateInputs && index == 0) {
            childButton.autofocus = true; // The first child node button will be focued if the inputs are disabled
        }
    }

    let addButton = document.createElement("button");
    addButton.className = "w-100 btn btn-outline-success mb-3";
    addButton.innerText = "Add";
    addButton.onclick = addClickCallback;
    childrenDiv.appendChild(addButton);

    if (activateAddButton) {
        if (!childrenNodes.length && !activateInputs) {
            // When the inputs are disabled and there is no children the add button will be activated
            addButton.autofocus = true;
        }
    } else {
        addButton.disabled = true;
    }

    let deleteButton = document.createElement("button");
    deleteButton.className = "w-100 btn btn-outline-danger mb-3";
    deleteButton.innerText = "Delete";
    deleteButton.onclick = deleteClickCallback;
    childrenDiv.appendChild(deleteButton);

    if (!activateDeleteButton) {
        deleteButton.disabled = true;
    }

    contentDiv.appendChild(childrenDiv);

    let detailsDiv = document.createElement("div");
    detailsDiv.className = "col-6 h-100 d-none d-flex flex-column pt-1";

    let nameInput = document.createElement("input");
    nameInput.className = "form-control mb-3 text-truncate";
    detailsDiv.appendChild(nameInput);

    let descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.className = "form-control flex-grow-1";
    if (!activateInputs) {
        nameInput.disabled = true;
        descriptionTextarea.disabled = true;
    } else {
        nameInput.autofocus = true;
        if (!currentNode) {
            descriptionTextarea.disabled = true;
        }
    }

    nameInput.onchange = event => {
        if (nameInput.value) {
            descriptionTextarea.classList.remove("inactive");
        } else {
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
