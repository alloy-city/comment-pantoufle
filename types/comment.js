class Comment {
    constructor(
        level = 0,
        lesson = "",
        timestamp = new Date(),
        body = "",
    ) {
        this.level = level;
        this.lesson = lesson;
        this.timestamp = timestamp;
        this.body = body;
    }

    setAuthor(author) {
        this.author = author;
    }

    getAuthor() {
        return this.author;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setParent(parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    setChildren(children) {
        this.children = children;
    }

    getChildren() {
        return this.children;
    }

    addChild(child) {
        this.children.push(child);
    }

    setBody(body) {
        this.body = body;
    }

    getBody() {
        return this.body;
    }
}

export { Comment }
