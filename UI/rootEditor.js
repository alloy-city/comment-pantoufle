import { waiting, doneWaiting, addEmoticonButtons } from '@alloy-city/comment-pantoufle/UI';
import { postRootComment } from '@alloy-city/comment-pantoufle/http/http';

function rootEditor(lessonId, rootElement) {
    let editor = document.createElement("div");
    let title = document.createElement("p");
    let textBox = document.createElement("textarea");
    let buttonContainer = document.createElement("div");
    let saveButton = document.createElement("button");

    buttonContainer.appendChild(saveButton);
    buttonContainer.setAttribute("style", "display: flex; flex-direction: row-reverse; margin-top: 10px;");
    addEmoticonButtons(buttonContainer, textBox);

    title.innerText = string.material.comments.leaveAComment;
    title.setAttribute("style", "color: white; font-size: large; margin-bottom: 10px; font-family: 'Abraham';");

    saveButton.innerText = string.buttons.comment;

    saveButton.classList.add("btn", "btn-info");
    saveButton.setAttribute("type", "button");
    saveButton.setAttribute("style", "margin-left: 10px;");

    textBox.classList.add("form-control");
    textBox.setAttribute("rows", "5");
    textBox.setAttribute("placeholder", string.material.comments.writePublicComment);
    textBox.setAttribute("style", "background-color: #c9e1cf;color: #4e4e4e;");

    editor.setAttribute("style", "background-color: #76bf89; border-radius: 10px; padding: 10px; box-shadow: 3px 3px 6px #6b6b6b94; margin-top: 10px; margin-bottom: 13px;");

    editor.appendChild(title);
    editor.appendChild(textBox);
    editor.appendChild(buttonContainer);

    saveButton.onclick = () => {
        if (textBox.value.length == 0) return;

        waiting(editor);
        postRootComment(lessonId, textBox.value, () => {
            doneWaiting(editor);
        });
    }

    rootElement.appendChild(editor);

    return editor;
}

export { rootEditor }
