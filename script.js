fetch("https://my-endpoints.onrender.com/blog/articles").then(async (response) => {
    const articles = await response.json();
    let html = "";
    for (const article of articles) {
        html += `
            <a href="./article/article.html?${article._id}">
                <article style="display: flex; align-items: center; justify-content: space-between;">
                    ${article.image?.orientation === "left" ? `<img style="width: 80px; height: 80px; margin-right: 1em; border: 1px solid blackò" src=${article.image?.data}>` : ""}
                    <div style="width:100%;">
                        <p>${article.title}</p>
                        <span>${article.abstract}</span>
                    </div>
                    ${article.image?.orientation === "right" ? `<img style="width: 80px; height: 80px; margin-left: 1em; border: 1px solid blackò" src=${article.image?.data}>` : ""}
                </article>
            </a>
        `;
    }
    document.getElementById("container").innerHTML = html;
})