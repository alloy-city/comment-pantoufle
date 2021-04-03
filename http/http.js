import { Comment, Author } from '../types';
import { stateMachine } from '../stateMachine';

let user = new Author(
    Auth.userData._id,
    Auth.userData.picture ? Auth.userData.picture : "/images/noPicture.png",
    Auth.userData.nickname ? Auth.userData.nickname : Auth.userData._id,
)

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
        if (response.status == 400) {
            console.log(response);
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
                        parsedResponse.comment.nOfChildren,
                        true
                    )

                    c.setAuthor(user);

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

function instanciateComments(lesson_id, level, comments) {
    for (let i=0; i<comments.length; i++) {
        if (!(comments[i].author._id in stateMachine.authors)) {
            stateMachine.addAuthor(new Author(
                comments[i].author._id,
                comments[i].author.picture && comments[i].author.picture.length > 0 ? comments[i].author.picture : "/images/person_blue_bg_64p.png",
                comments[i].author.nickname || "",
            ));
        }

        if (!(comments[i]._id in stateMachine.comments)) {
            let c = new Comment(
                comments[i]._id,
                level,
                lesson_id,
                comments[i].timestamp,
                comments[i].text,
                comments[i].nOfChildren,
                comments[i].visible
            )

            if (c.level > 0) {
                c.setParent(comments[i].parent)
            }

            c.setAuthor(stateMachine.authors[comments[i].author._id]);

            stateMachine.addComment(c);
        }
    }
}

function fetchComments(lesson_id, level, page, callback) {
    get(`comment?lesson_id=${lesson_id}&level=${level}&page=${page}`, (res) => {
        console.log(res.comments.length);

        instanciateComments(lesson_id, level, res.comments);
        callback(res.comments.length);
    });
}

function fetchReplies(lesson_id, parent, page, callback) {
    get(`comment/replies?parent=${parent}&page=${page}`, (res) => {
        instanciateComments(lesson_id, 1, res.comments);
        callback(res.comments.length);
    });
}

function removeComment(comment, callback) {
    remove(`comment/${comment._id}`, callback);
}

export { postComment, postRootComment, fetchComments, removeComment, fetchReplies }
