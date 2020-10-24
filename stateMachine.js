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
        this.orderedRootComments.push(comment);
    }

    addAuthor(author) {
        this.authors[author._id] = author;
    }
}

let stateMachine = new StateMachine();

export { stateMachine }
