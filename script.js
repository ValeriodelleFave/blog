fetch("http://localhost:3000/blog/articles").then(async (response) => {
    const articles = await response.json();
    let html = "";
    for (const article of articles) {
        html += `
            <a href="/article.html?${article._id}">
                <article>
                    <p>${article.title}</p>
                    <span>${article.abstract}</span>
                </article>
            </a>
        `;
    }
    document.getElementById("container").innerHTML = html;
})