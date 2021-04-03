class StateMachine {
    constructor(
        comments = {},
        authors = {},
        orderedRootComments = []
    ) {
        this.comments = comments;
        this.authors = authors;
        this.orderedRootComments = orderedRootComments;
    }

    clear() {
        this.comments = {};
        this.orderedRootComments = [];
        this.authors = {};
    }

    addComment(comment) {
        this.comments[comment._id] = comment;

        if (comment.parent) {
            this.comments[comment.parent].addChild(comment);
        } else {
            this.orderedRootComments.push(comment);
        }
    }

    addAuthor(author) {
        this.authors[author._id] = author;
    }

    pushNewComment(comment) {
        this.comments[comment._id] = comment;
        this.orderedRootComments.unshift(comment);
    }

    removeComment(comment_id) {
        delete this.comments[comment_id];
        
        for (let i=0; i<this.orderedRootComments.length; i++) {
            if (this.orderedRootComments[i]._id == comment_id) {
                this.orderedRootComments.splice(i, 1);
                break;
            }
        }
    }
}

let stateMachine = new StateMachine();

export { stateMachine }
