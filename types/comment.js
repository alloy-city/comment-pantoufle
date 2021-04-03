class Comment {
    constructor(
        _id,
        level = 0,
        lesson,
        timestamp = new Date(),
        body = "",
        nOfChildren = 0,
        visible
    ) {
        this._id = _id;
        this.level = level;
        this.lesson = lesson;
        this.timestamp = timestamp;
        this.body = body;
        this.nOfChildren = nOfChildren;
        this.visible = visible;
        this.children = [];
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
