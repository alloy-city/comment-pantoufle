function addComment(root, text) {
    let comment = document.createElement("div");
    comment.setAttribute("style", "background-color: #76bf89; border-radius: 10px; padding: 10px; box-shadow: 3px 3px 6px #6b6b6b94; margin-top: 10px");

    let textElement = document.createElement("p")
    textElement.innerText = text;

    comment.appendChild(textElement);
    root.appendChild(comment);
}

export { addComment }
