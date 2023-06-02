const emoticons = [
    "😀",
    "🙂",
    "🙃",
    "😉",
    "🥰",
    "😍",
    "❤️",
    "🤩",
    "😘",
    "😋",
    "😒",
    "🙄",
    "😬",
    "😴",
    "😷",
    "😎",
    "🙁",
    "😮",
    "😲",
    "🥺",
    "😥",
    "😱",
    "😠",
    "👽",
    "🤘",
    "✌",
    "🤙",
    "👈",
    "👉",
    "👍",
    "👎",
    "👊",
    "🚀"
];

function addEmoticonButtons(root, textBox) {
    let container = document.createElement("div");

    for (let i=0; i<emoticons.length; i++) {
        let icon = document.createElement("span")
        icon.setAttribute("style", "cursor: pointer");
        icon.innerText = emoticons[i];
        icon.onclick = () => {
            textBox.setRangeText(emoticons[i]);
            textBox.focus();
            textBox.selectionStart = textBox.selectionEnd += 2;
        }

        container.appendChild(icon);
    }

    root.appendChild(container);
}

export { addEmoticonButtons }
