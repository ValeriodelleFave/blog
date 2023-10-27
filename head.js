function setHeadMeta() {
    const head = document.getElementsByTagName("head");
    const tags = [
        {
            type: "meta",
            attribute: {
                charset: "UTF-8"
            }
        },
        {
            type: "meta",
            attribute: {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            }
        }
    ];

    for (const tag of tags) {
        let tempTag = document.createElement(tag.type);
        switch (tag.type) {
            case "meta":
                for (const key of Object.keys(tag.attribute)) {
                    tempTag.setAttribute(key, tag.attribute[key]);
                }
                break;
            case "title":
                tempTag.innerText = tag.text;
                break;
            default:
                break;
        }
        head[0].appendChild(tempTag);
    }
}

setHeadMeta()