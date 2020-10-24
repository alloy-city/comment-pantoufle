// perform HTTP requests.
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
        // console.log(response.status)

        if (response.status == 304) {
            callback(304)
        }
        if (response.status == 204) {
            callback(0)
        }
        if (response.status == 200) {
            response.json().then(callback)
        } else {
            response.json().then(err => {
                // console.log(err)
                notify(err, "warning", true)
            })
        }
    }).catch(reason => {
        // console.log(reason)
    })
}

function get(route, callback) {
    http("GET", null, route, callback)
}

function post(body, route, callback) {
    http("POST", body, route, callback)
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

export { postComment }
