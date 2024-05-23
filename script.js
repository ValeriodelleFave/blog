fetch("https://my-endpoints.onrender.com/blog/articles").then(async (response) => {
    const articles = await response.json();
    let html = "";
    for (const article of articles) {
        html += `
            <a href="./article/article.html?${article._id}">
                <article class="article-container">
                    <div style="width:100%;">
                        <p class="article-title">${article.title}</p>
                        <p class="article-pubblication-date">${article.publicationDate}</p>
                        <summary class="article-abstract">${article.abstract}</summary>
                    </div>
                    ${article.image?.orientation === "right" ? `<img class="article-image" src=${article.image?.data}>` : ""}
                </article>
            </a>
        `;
    }
    document.getElementById("container").innerHTML = html;
})