import { stateMachine } from '../stateMachine';
import { formatComment } from './formatComment';

let rootCommentsContainerElement = document.createElement("div");

function initializeRootComments(root) {
    rootCommentsContainerElement.innerHTML = "";
    root.appendChild(rootCommentsContainerElement);
    updateRootComments();
}

function updateRootComments () {
    for (let i=0; i<stateMachine.orderedRootComments.length; i++) {
        formatComment(rootCommentsContainerElement, stateMachine.orderedRootComments[i]);
    }
}

export { initializeRootComments, updateRootComments }
