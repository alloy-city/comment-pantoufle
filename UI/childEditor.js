import { waiting, addEmoticonButtons, addChildComment } from '@alloy-city/comment-pantoufle/UI';
import { postComment } from '@alloy-city/comment-pantoufle/http/http';

function childEditor(lessonId, parent, level, root) {
    let editor = document.createElement("div");
    let title = document.createElement("p");
    let textBox = document.createElement("textarea");
    let buttonContainer = document.createElement("div");
    let saveButton = document.createElement("button");
    let cancelButton = document.createElement("button");

    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);
    buttonContainer.setAttribute("style", "display: flex; flex-direction: row-reverse; margin-top: 10px;");
    addEmoticonButtons(buttonContainer, textBox);

    title.innerText = string.material.comments.leaveAComment;
    title.setAttribute("style", "color: white; font-size: large; margin-bottom: 10px; font-family: 'Abraham';");

    saveButton.innerText = string.buttons.comment;
    cancelButton.innerText = string.buttons.cancel;

    saveButton.classList.add("btn", "btn-info");
    cancelButton.classList.add("btn");
    saveButton.setAttribute("type", "button");
    saveButton.setAttribute("style", "margin-left: 10px;");
    cancelButton.setAttribute("type", "button");

    textBox.classList.add("form-control");
    textBox.setAttribute("rows", "5");
    textBox.setAttribute("placeholder", string.material.comments.writePublicComment);
    textBox.setAttribute("style", "background-color: #c9e1cf;color: #4e4e4e;");

    editor.setAttribute("style", "background-color: #76bf89; border-radius: 10px; padding: 10px; box-shadow: 3px 3px 6px #6b6b6b94; margin-bottom: 20px");

    editor.appendChild(title);
    editor.appendChild(textBox);
    editor.appendChild(buttonContainer);

    saveButton.onclick = () => {
        if (textBox.value.length == 0) return;

        waiting(editor);
        postComment(lessonId, parent, level, textBox.value, (response) => {
            addChildComment(parent, response)
            editor.remove();
        });
    }

    cancelButton.onclick = () => {
        editor.remove();
    }

    root.appendChild(editor);
    textBox.focus();

    return editor;
}

export { childEditor }
