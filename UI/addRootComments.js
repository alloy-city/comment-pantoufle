import { stateMachine } from '@alloy-city/comment-pantoufle/stateMachine';
import { appendComment, prependComment, insertChildComment } from '@alloy-city/comment-pantoufle/UI/formatComment';

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

function addChildComment(parent_comment, comment_id) {
    stateMachine.comments[parent_comment].nOfChildren++;
    insertChildComment(document.getElementById(parent_comment), stateMachine.comments[comment_id]);
}

export { initializeRootComments, updateRootComments, addJustWrittenComment, addChildComment }
