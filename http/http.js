import { Comment, Author } from '../types';
import { stateMachine } from '../stateMachine';

function http(method, body, route, callback) {
    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
    })

    let init = {
        method: method,
        headers: headers,
    }

    if (body) {
        init.body = JSON.stringify(body)
    }

    fetch(`${apiDomain}/api/${route}`, init).then(response => {
        if (response.status == 304) {
            callback(304)
        }
        if (response.status == 204) {
            callback(0)
        }
        if (response.status == 200) {
            response.json().then((parsedResponse) => {
                if (parsedResponse.status === "COMMENT_SAVED") {
                    let c = new Comment(
                        parsedResponse.comment._id,
                        parsedResponse.comment.level,
                        parsedResponse.comment.lesson,
                        parsedResponse.comment.timestamp,
                        parsedResponse.comment.text,
                        parsedResponse.comment.nOfChildren
                    )

                    let a = new Author(
                        Auth.userData._id,
                        Auth.userData.picture ? Auth.userData.picture : "/images/noPicture.png",
                        Auth.userData.nickname ? Auth.userData.nickname : Auth.userData._id,
                    )

                    c.setAuthor(a);

                    stateMachine.pushNewComment(c);
                    callback(parsedResponse.comment._id);
                } else if (parsedResponse.status === "OK" && parsedResponse.msg === "COMMENT_DELETED") {
                    stateMachine.removeComment(parsedResponse.comment_id);
                    callback();
                } else {
                    callback(parsedResponse);
                }
            })
        } else {
            response.json().then(err => {
                notify(err, "warning", true)
            })
        }
    }).catch(reason => {
        notify(reason, "warning", true)
    })
}

function get(route, callback) {
    http("GET", null, route, callback)
}

function post(body, route, callback) {
    http("POST", body, route, callback)
}

function remove(route, callback) {
    http("DELETE", null, route, callback)
}

function postComment(lessonId, parent, level, text, callback) {
    let body = {
        "lesson_id": lessonId,
        "parent": parent,
        "level": level,
        "text": text
    }

    post(body, "comment/", callback);
}

function postRootComment(lessonId, text, callback) {
    let body = {
        "lesson_id": lessonId,
        "parent": null,
        "level": 0,
        "text": text
    }

    post(body, "comment/", callback);
}

function fetchComments(lesson_id, level, page, callback) {
    get(`comment?lesson_id=${lesson_id}&level=${level}&page=${page}`, (res) => {
        for (let i=0; i<res.comments.length; i++) {
            if (!(res.comments[i].author._id in stateMachine.authors)) {
                let authorDisplayName = res.comments[i].author._id;
                if (res.comments[i].author.nickname && res.comments[i].author.nickname.length > 0) authorDisplayName = res.comments[i].author.nickname;

                stateMachine.addAuthor(new Author(
                    res.comments[i].author._id,
                    res.comments[i].author.picture && res.comments[i].author.picture.length > 0 ? res.comments[i].author.picture : "/images/noPicture.png",
                    authorDisplayName
                ));
            }

            if (!(res.comments[i]._id in stateMachine.comments)) {
                let c = new Comment(
                    res.comments[i]._id,
                    level,
                    lesson_id,
                    res.comments[i].timestamp,
                    res.comments[i].text,
                    res.comments[i].nOfChildren
                )

                c.setAuthor(stateMachine.authors[res.comments[i].author._id]);

                stateMachine.addComment(c);
            }
        }

        callback(res.comments.length);
    });
}

function removeComment(comment, callback) {
    console.log(comment._id, callback);
    remove(`comment/${comment._id}`, callback);
}

export { postComment, postRootComment, fetchComments, removeComment }
