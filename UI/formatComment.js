import { stateMachine } from '@alloy-city/comment-pantoufle/stateMachine';
import { removeComment, fetchReplies } from '../http/http';
import { childEditor } from './childEditor';

function appendComment(parent, comment) {
    parent.appendChild(formatComment(comment));
}

function prependComment(parent, comment) {
    parent.prepend(formatComment(comment));
}

function insertChildComment(parent, comment) {
    parent.childNodes[1].appendChild(formatComment(comment));
}

function formatNOfChildrenString(n) {
    if (n == 1) {
        return `1 ${string.buttons.reply}`;
    } else {
        return `${n} ${string.buttons.replies}`;
    }
}

function formatComment(comment) {
    function showChildEditor() {
        childEditor(comment.lesson, comment._id, 1, bottom);
    }

    let root = document.createElement("div");
    root.setAttribute("style", "display: flex; flex-direction: column");
    root.setAttribute("id", comment._id);

    let top = document.createElement("div");
    top.setAttribute("style", "display: flex; flex-direction: row;")

    let bottom = document.createElement("div");
    bottom.setAttribute("style", "margin-left: 63px")

    let left = document.createElement("div");
    left.setAttribute("style", "display: flex; flex-direction: column;")

    let right = document.createElement("div");
    right.setAttribute("style", "padding-left: 13px;")

    let pictureContainer = document.createElement("div");
    if (comment.level == 0) {
        pictureContainer.setAttribute("style", "border-radius: 50%; width: 50; height: 50px; position: relative; overflow: hidden; margin-top: 14px;")
    } else {
        pictureContainer.setAttribute("style", "border-radius: 50%; width: 33px; height: 33px; position: relative; overflow: hidden; margin-top: 14px;")
    }

    let lineContainer = document.createElement("div");
    lineContainer.setAttribute("style", "flex: 1")

    let infoContainer = document.createElement("div");
    infoContainer.setAttribute("style", "color: #6a6965; font-style: italic; font-size: small; padding-left: 9px;");

    let bodyContainer = document.createElement("div");

    let actionsContainer = document.createElement("div");
    actionsContainer.setAttribute("style", "display: flex; flex-direction: row-reverse; padding-left: 10px; padding-right: 10px;");

    let separationContainer = document.createElement("div");
    separationContainer.setAttribute("style", "white; height: 13px");

    root.appendChild(top)
    root.appendChild(bottom)

    top.appendChild(left)
    top.appendChild(right)

    left.appendChild(pictureContainer)
    left.appendChild(lineContainer)

    right.appendChild(infoContainer)
    right.appendChild(bodyContainer)
    right.appendChild(actionsContainer)
    right.appendChild(separationContainer)

    let textElement = document.createElement("span");
    if (!comment.visible) {
        bodyContainer.setAttribute("style", "padding: 10px; border-radius: 13px;");
        textElement.innerHTML = `<i>${string.material.comments.removedByAuthor}</i>`;
        textElement.setAttribute("style", "color: #525252;")
    } else {
        bodyContainer.setAttribute("style", "background: #2e92cc; padding: 10px; border-radius: 13px;");
        textElement.innerText = comment.body;
        textElement.setAttribute("style", "color: white;")
    }
    bodyContainer.appendChild(textElement);

    let authorElement = document.createElement("span");
    if (comment.author.displayName.length > 0) {
        authorElement.innerText = comment.author.displayName;
    } else {
        authorElement.innerText = comment.author._id;
        authorElement.setAttribute("title", string.material.comments.setYourDisplayName);
    }
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
    if (comment.author._id === Auth.userData._id && comment.visible) {
        removeActionElement.setAttribute("style", "cursor: pointer; margin-left: 10px; font-weight: bold; color: #e94256;");
        removeActionElement.innerText = string.buttons.remove;
        actionsContainer.appendChild(removeActionElement);

        removeActionElement.onclick = () => {
            removeComment(comment, () => {
                if (comment.nOfChildren == 0) {
                    if (comment.parent) {
                        stateMachine.comments[comment.parent].nOfChildren--;
                    }
                    root.remove();
                } else {
                    comment.setBody("");
                    bodyContainer.setAttribute("style", "padding: 10px; border-radius: 13px;");
                    textElement.innerHTML = `<i>${string.material.comments.removedByAuthor}</i>`;
                    textElement.setAttribute("style", "color: #525252;");
                    actionsContainer.remove();
                }

                if (comment.parent) {
                    if (stateMachine.comments[comment.parent].nOfChildren == 0) {
                        if (!stateMachine.comments[comment.parent].visible) {
                            document.getElementById(comment.parent).remove();
                        } else {
                            document.getElementById(comment.parent).children[0].children[1].children[2].children[0].innerText = string.buttons.respond;
                            document.getElementById(comment.parent).children[0].children[1].children[2].children[0].onclick = showChildEditor;
                        }
                    } else {
                        document.getElementById(comment.parent).children[0].children[1].children[2].children[0].innerText = formatNOfChildrenString(stateMachine.comments[comment.parent].nOfChildren);
                    }
                }
            });
        }

        if (comment.level == 0) {
            let bulletActionSeparatorElement = document.createElement("span");
            bulletActionSeparatorElement.setAttribute("style", "margin-left: 10px; color: #6a6965;");
            bulletActionSeparatorElement.innerHTML = "&#9679;";
            actionsContainer.appendChild(bulletActionSeparatorElement);
        }
    }

    if (comment.level == 0) {
        let commentActionElement = document.createElement("span");
        commentActionElement.setAttribute("style", "cursor: pointer; font-weight: bold; color: #2e92cc;");

        if (comment.nOfChildren == 0) {
            commentActionElement.innerText = string.buttons.respond;
            commentActionElement.onclick = showChildEditor;
        } else {
            commentActionElement.innerText = formatNOfChildrenString(comment.nOfChildren);

            commentActionElement.onclick = () => {
                fetchReplies(comment.lesson, comment._id, 0, (res) => {
                    for (let i=0; i<stateMachine.comments[comment._id].children.length; i++) {
                        bottom.appendChild(formatComment(stateMachine.comments[comment._id].children[i]))
                    }

                    if (comment.visible) {
                        commentActionElement.innerText = string.buttons.respond;
                        commentActionElement.onclick = showChildEditor;
                    } else {
                        commentActionElement.onclick = null;
                        commentActionElement.setAttribute("style", "cursor: default; font-weight: bold; color: #2e92cc;");
                    }
                })
            }
        }
        actionsContainer.appendChild(commentActionElement);
    }

    return root;
}

export { appendComment, prependComment, formatComment, insertChildComment }
