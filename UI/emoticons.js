const emoticons = [
    "😀",
    "🙂",
    "🙃",
    "😉",
    "🥰",
    "😍",
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
    "❤",
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
            textBox.value += `${emoticons[i]}`;
        }

        container.appendChild(icon);
    }

    root.appendChild(container);
}

export { addEmoticonButtons }
