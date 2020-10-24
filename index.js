import Comment from './comment';

let c = new Comment(0, "me", new Date(), "Hello, world!");

r.addChild(c);

function assembleCommentTree (lessonId) {
    console.log("The Comment Submodule", lessonId, c.getBody());
}

export { assembleCommentTree };
