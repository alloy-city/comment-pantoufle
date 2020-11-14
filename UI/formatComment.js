import { removeComment } from '../http/http';

function appendComment(parent, comment) {
    parent.appendChild(formatComment(comment));
}

function prependComment(parent, comment) {
    parent.prepend(formatComment(comment));
}

function formatComment(comment) {
    let root = document.createElement("div");
    root.setAttribute("style", "display: flex");
    root.setAttribute("id", comment._id);

    let left = document.createElement("div");
    left.setAttribute("style", "display: flex; flex-direction: column;")
    
    let right = document.createElement("div");
    right.setAttribute("style", "padding-left: 13px;")

    let pictureContainer = document.createElement("div");
    pictureContainer.setAttribute("style", "border-radius: 50%; width: 50px; height: 50px; position: relative; overflow: hidden; margin-top: 14px;")

    let lineContainer = document.createElement("div");
    lineContainer.setAttribute("style", "flex: 1")

    let infoContainer = document.createElement("div");
    infoContainer.setAttribute("style", "color: #6a6965; font-style: italic; font-size: small; padding-left: 9px;");

    let bodyContainer = document.createElement("div");
    bodyContainer.setAttribute("style", "background: #2e92cc; padding: 10px; border-radius: 13px;");

    let actionsContainer = document.createElement("div");
    actionsContainer.setAttribute("style", "display: flex; flex-direction: row-reverse; padding-left: 10px; padding-right: 10px;");

    let separationContainer = document.createElement("div");
    separationContainer.setAttribute("style", "white; height: 13px");

    root.appendChild(left)
    root.appendChild(right)

    left.appendChild(pictureContainer)
    left.appendChild(lineContainer)

    right.appendChild(infoContainer)
    right.appendChild(bodyContainer)
    right.appendChild(actionsContainer)
    right.appendChild(separationContainer)

    let textElement = document.createElement("span");
    textElement.setAttribute("style", "color: white;")
    textElement.innerText = comment.body;
    bodyContainer.appendChild(textElement);

    let authorElement = document.createElement("span");
    authorElement.innerText = comment.author.displayName;
    infoContainer.appendChild(authorElement);

    let bulletSeparatorElement = document.createElement("span");
    bulletSeparatorElement.setAttribute("style", "margin-left: 10px;");
    bulletSeparatorElement.innerHTML = "&#9679;";
    infoContainer.appendChild(bulletSeparatorElement);

    let timestampElement = document.createElement("span");
    timestampElement.setAttribute("style", "margin-left: 10px");
    timestampElement.innerText = moment(comment.timestamp).fromNow();
    infoContainer.appendChild(timestampElement);

    let pictureElement = document.createElement("img");
    pictureElement.setAttribute("style", "display: inline; margin: 0 auto; height: 100%; width: auto;");
    pictureElement.setAttribute("src", comment.author.profilePic)
    pictureContainer.appendChild(pictureElement);

    // actions
    let removeActionElement = document.createElement("span");
    removeActionElement.setAttribute("style", "cursor: pointer; margin-left: 10px; font-weight: bold; color: #e94256;");
    removeActionElement.innerText = string.buttons.remove;
    actionsContainer.appendChild(removeActionElement);

    let bulletActionSeparatorElement = document.createElement("span");
    bulletActionSeparatorElement.setAttribute("style", "margin-left: 10px; color: #6a6965;");
    bulletActionSeparatorElement.innerHTML = "&#9679;";
    actionsContainer.appendChild(bulletActionSeparatorElement);

    let commentActionElement = document.createElement("span");
    commentActionElement.setAttribute("style", "cursor: pointer; font-weight: bold; color: #2e92cc;");
    commentActionElement.innerText = string.buttons.comment;
    actionsContainer.appendChild(commentActionElement);

    removeActionElement.onclick = () => {
        removeComment(comment, () => {
            root.remove();
        });
    }

    return root;
}

export { appendComment, prependComment, formatComment }
