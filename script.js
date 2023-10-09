fetch("http://localhost:3000/blog/articles").then(async (response) => {
    const articles = await response.json();
    let html = "";
    for (const article of articles) {
        html += `
            <a href="/article.html?${article.id}">
                <article>
                    <p>${article.title}</p>
                    <span>${article.description}</span>
                </article>
            </a>
        `;
    }
    document.getElementById("container").innerHTML = html;
})