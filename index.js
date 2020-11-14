import {
    rootEditor,
    childEditor,
    waiting,
    doneWaiting,
    addEmoticonButtons,
    button,
    addComment,
    initializeRootComments,
    updateRootComments
} from './UI';
import { Author, Comment } from './types';
import { postComment, fetchComments } from './http/http';
import { stateMachine } from './stateMachine';

let root;
let re;
let lessonId;

function assembleCommentTree (lessonId, commentTreeContainer) {
    commentTreeContainer.innerHTML = "";
    stateMachine.clear();

    root = commentTreeContainer;
    lessonId = lessonId;

    re = rootEditor(lessonId, root);

    fetchComments(lessonId, 0, 0, (nOfCommentsFetched) => {
        // if (nOfCommentsFetched > 0) {
            console.log(`${nOfCommentsFetched} comments fetched.`);
            initializeRootComments(root);
        // }
    })
}

export { assembleCommentTree };
