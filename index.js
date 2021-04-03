import {
    rootEditor,
    initializeRootComments,
} from './UI';
import { fetchComments } from './http/http';
import { stateMachine } from './stateMachine';

let root;
let re;

function assembleCommentTree (lessonId, commentTreeContainer) {
    commentTreeContainer.innerHTML = "";
    stateMachine.clear();

    root = commentTreeContainer;
    lessonId = lessonId;

    re = rootEditor(lessonId, root);

    fetchComments(lessonId, 0, 0, (nOfCommentsFetched) => {
        initializeRootComments(root);
    })
}

export { assembleCommentTree };
