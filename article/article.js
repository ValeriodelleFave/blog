fetch("https://my-endpoints.onrender.com/blog/articles/" + location.search.replace("?", "")).then(async (response) => {
    const article = await response.json();
    let html = "";
    html += `
        <div class="container">
            <img src="https://pbs.twimg.com/media/DXgyuJEXkAA3J0B?format=jpg&name=large" alt="">
            <h2>${article.title}</h2>
        </div>
        <h5>${article.publicationDate}</h5>
        <div>
            <p>${article.description}</p>
        </div>
    `;

    document.getElementById("container").innerHTML = html;
})