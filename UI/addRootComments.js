import { stateMachine } from '../stateMachine';
import { appendComment, prependComment } from './formatComment';

let rootCommentsContainerElement = document.createElement("div");

function initializeRootComments(root) {
    rootCommentsContainerElement.innerHTML = "";
    root.appendChild(rootCommentsContainerElement);
    updateRootComments();
}

function updateRootComments () {
    for (let i=0; i<stateMachine.orderedRootComments.length; i++) {
        appendComment(rootCommentsContainerElement, stateMachine.orderedRootComments[i]);
    }
}

function addJustWrittenComment(comment_id) {
    prependComment(rootCommentsContainerElement, stateMachine.comments[comment_id]);
}

export { initializeRootComments, updateRootComments, addJustWrittenComment }
