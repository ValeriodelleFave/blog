async function send() {

    const object = {
        _id: document.getElementById("_id").value == "" ? null : document.getElementById("_id").value,
        title: document.getElementById("title").value,
        publicationDate: document.getElementById("publicationDate").value,
        abstract: document.getElementById("abstract").value,
        description: document.getElementById("description").value,
        cover: null,
        image: {
            data: "scasda",
            orientation: "right"
        },
        creationDate: new Date().toLocaleDateString()
    }

    await fetch("https://my-endpoints.onrender.com/blog/articles", {
        body: JSON.stringify(object),
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    window.location.href = "/admin/admin.html";
}

function edit(params) {
    for (const key in params) {
        document.getElementById(key).value = params[key];
    }
}

function reset() {
    document.getElementById("_id").value = null;
    document.getElementById("title").value = null;
    document.getElementById("publicationDate").value = null;
    document.getElementById("abstract").value = null;
    document.getElementById("description").value = null;
}

function checkDataExist() {
    const data = JSON.parse(sessionStorage.getItem("form-data"));
    if (data === null) return

    for (const key in data) {
        if (document.getElementById(key) === null) continue
        document.getElementById(key).value = data[key];
    }
}