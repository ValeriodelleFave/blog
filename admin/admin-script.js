function loadData() {
    fetch("https://my-endpoints.onrender.com/blog/articles").then(async (response) => {
        const articles = await response.json();
        document.getElementById("container").innerHTML = "";
        for (const article of articles) {
            const articleElement = document.createElement("article");
            articleElement.id = article._id;
            const articleContainer = document.createElement("div");
                const articleTitle = document.createElement("p");
                articleTitle.innerHTML = article.title;
                const articlePublicationDate = document.createElement("p");
                articlePublicationDate.innerHTML = article.publicationDate;
            articleContainer.appendChild(articleTitle);
            articleContainer.appendChild(articlePublicationDate);
            articleContainer.classList.add("article");
            const containerButtons = document.createElement("div");
                containerButtons.classList.add("buttons-container");
                const editButton = document.createElement("button");
                editButton.innerHTML = "Modifica";
                editButton.addEventListener("click", () => {
                    edit(article);
                });
                const cancelButton = document.createElement("button");
                cancelButton.innerHTML = "Cancella";
                cancelButton.addEventListener("click", () => {
                    cancel(article);
                });
                containerButtons.appendChild(editButton);
                containerButtons.appendChild(cancelButton);
                articleContainer.appendChild(containerButtons);

            articleElement.appendChild(articleContainer);
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

    await fetch("http://localhost:3000/blog/articles", {
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

    await fetch("http://localhost:3000/blog/articles", {
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