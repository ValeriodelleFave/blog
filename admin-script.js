function loadData() {
    fetch("http://localhost:3000/blog/articles").then(async (response) => {
        const articles = await response.json();
        let html = "";
        for (const article of articles) {
            html += `
                <article id="${article._id}">
                    <p>${article.title} | ${article.publicationDate}</p>
                </article>
            `;
        }
        document.getElementById("container").innerHTML = html;
    })
}
loadData();

async function send() {

    const object = {
        title: document.getElementById("title").value,
        publishData: document.getElementById("publishData").value,
        abstract: document.getElementById("abstract").value,
        description: document.getElementById("description").value
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