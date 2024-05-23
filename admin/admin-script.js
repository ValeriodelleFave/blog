function loadData() {
    fetch("https://my-endpoints.onrender.com/blog/articles").then(async (response) => {
        const articles = await response.json();
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
            publishButton.addEventListener("click", () => console.log("Pubblica/Spubblica"));
            const previewButton = document.createElement("button");
            previewButton.innerHTML = "Preview";
            previewButton.addEventListener("click", () => console.log("Preview"));
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

function onEdit(params) {
    sessionStorage.setItem("form-data", JSON.stringify(params));
    window.location.href = "/blog-form/blog-form.html" 
}

async function onDelete(params) {

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