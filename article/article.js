fetch("http://localhost:3000/blog/articles/" + location.search.replace("?", "")).then(async (response) => {
    const article = await response.json();
    let html = "";
    html += `
        <h2>${article.title}</h2>
        <h5>${article.publicationDate}</h5>
        <div>
            <p>${article.description}</p>
        </div>
    `;

    document.getElementById("container").innerHTML = html;
})