function loadData() {
    fetch("https://my-endpoints.onrender.com/blog/articles").then(async (response) => {
        const articles = await response.json();
        document.getElementById("container").innerHTML = "";
        renderArticles(articles);
    })
}
loadData();

function renderArticles(articles) {
    for (const article of articles) {
        const articleElement = document.createElement("article");
        articleElement.id = article._id;
        const title = document.createElement("span");
        title.innerHTML = article.title;
        title.classList.add("article-title");
        const publicationDate = document.createElement("span");
        publicationDate.innerHTML = article.publicationDate;
        publicationDate.classList.add("article-publicationDate");
        const status = document.createElement("span");
        const dot = document.createElement("div");
        dot.style.width = "15px";
        dot.style.height = "15px";
        dot.style.backgroundColor = article.status ? "green" : "red";
        dot.style.borderRadius = "10%";
        dot.style.marginRight = "2px";
        status.append(dot);
        status.innerHTML += article.status ? "Online" : "Offline";
        status.classList.add("article-status");

        const buttons = document.createElement("div");
        buttons.classList.add("buttons-container");
        const publishButton = document.createElement("button");
        publishButton.innerHTML = "Pubblica/Spubblica";
        publishButton.addEventListener("click", () => onPublishUnpublish(article));
        const previewButton = document.createElement("button");
        previewButton.innerHTML = "Preview";
        previewButton.addEventListener("click", () => onPreview(article));
        const editButton = document.createElement("button");
        editButton.innerHTML = "Modifica";
        editButton.addEventListener("click", () => onEdit(article));
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Cancella";
        deleteButton.addEventListener("click", () => onDelete(article));
        buttons.append(publishButton, previewButton, editButton, deleteButton);

        articleElement.append(title, publicationDate, status, buttons);
        document.getElementById("container").appendChild(articleElement);
    }
}

async function onPublishUnpublish(article) {
    const object = { ...article, status: !article.status };

    await fetch("https://my-endpoints.onrender.com/blog/articles", {
        body: JSON.stringify(object),
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    loadData();
}

function onPreview(article) {
    console.log("Pubblica/Spubblica: ", article.title);
}

function onEdit(params) {
    sessionStorage.setItem("form-data", JSON.stringify(params));
    window.location.href = "/blog-form/blog-form.html"
}

async function onDelete(params) {
    await fetch("https://my-endpoints.onrender.com/blog/articles", {
        body: JSON.stringify(params),
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    loadData();
}

function onCreate() {
    sessionStorage.clear();
    window.location.replace('../blog-form/blog-form.html');
}