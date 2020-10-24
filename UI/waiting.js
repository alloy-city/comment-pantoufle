let cover = null;

function waiting(element) {
    let rect = element.getClientRects()[0];
    cover = document.createElement("div");
    cover.setAttribute("style", `width: ${rect.width}px;height: ${rect.height}px;background-color: #ffffffba; display: flex; position: absolute; flex-direction: row; justify-content: center;left: 0;z-index: 2; border-radius: 10px; margin-top: ${rect.height*-1+10}px; text-align: center`);

    let animationContainer = document.createElement("div")
    animationContainer.innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`;
    animationContainer.setAttribute("style", "display: flex; flex-direction: column; justify-content: space-around");
    cover.appendChild(animationContainer);
    element.appendChild(cover);
}

function doneWaiting() {
    cover.remove();
}

export { waiting, doneWaiting }
