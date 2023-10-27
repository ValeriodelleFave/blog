function loadData() {
    fetch("https://my-endpoints.onrender.com/blog/articles").then(async (response) => {
        const articles = await response.json();
        document.getElementById("container").innerHTML = "";
        for (const article of articles) {
            const articleElement = document.createElement("article");
            articleElement.id = article._id;
            const p = document.createElement("p");
            p.innerHTML = article.title + "|" + article.publicationDate;
            const editButton = document.createElement("button");
            editButton.innerHTML = "±";
            editButton.addEventListener("click", () => {
                edit(article);
            });
            const cancelButton = document.createElement("button");
            cancelButton.innerHTML = "×";
            cancelButton.addEventListener("click", () => {
                cancel(article);
            });
            p.appendChild(editButton);
            p.appendChild(cancelButton);
            articleElement.appendChild(p);
            document.getElementById("container").appendChild(articleElement);
        }
    })
}

loadData();

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
        }
    }

    await fetch("https://my-endpoints.onrender.com/blog/articles", {
        body: JSON.stringify(object),
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    loadData();
}

function edit(params) {
    for (const key in params) {
        document.getElementById(key).value = params[key];
    }
}

async function cancel(params) {

    await fetch("https://my-endpoints.onrender.com/blog/articles", {
        body: JSON.stringify(params),
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    loadData();
}

function reset() {
    document.getElementById("_id").value = null;
    document.getElementById("title").value = null;
    document.getElementById("publicationDate").value = null;
    document.getElementById("abstract").value = null;
    document.getElementById("description").value = null;
}