function button(root, text, style, action) {
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add(style);
    button.setAttribute("type", "submit");
    button.innerText = text;
    button.onclick = action;

    root.appendChild(button);

    return button;
}

export { button }
