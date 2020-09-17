class Portfolio {
    static all(type, limit, location) {
        location == null ? location = ".sublist" : location = `#${location}`
        var endpoint = "portfolio"
        var isSpecific = type == 0 || type == 1
        if (type == 0) { endpoint += "/interests" }
        if (type == 1) { endpoint += "/projects" }
        if (isSpecific && limit !== null) { endpoint += `/${limit}` }

        var request = new XMLHttpRequest()
        request.open('GET', `/api/${endpoint}`, true)

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let data = JSON.parse(this.response)
                data.forEach(element => {
                    let item = document.querySelector("#item").content
                    let tag = element.tag
                    item.querySelector(".item").id = `id-${tag}`
                    item.querySelector(".edit").setAttribute("href", `/portfolioEditor/${element.id}`)
                    item.querySelector(".detail > h3").textContent = element.title
                    item.querySelector(".detail > p").textContent = element.subtitle

                    var parser = new DOMParser()
                    var content = parser
                        .parseFromString(element.content, 'text/html')
                        .body.lastChild.textContent
                    item.querySelector(".overview > p").innerHTML = content
                    item.querySelector(".icon").src = (element.icon ? `/images/${element.icon}` : "")
                    var links = ""
                    if (element.github) {
                        links += `<a href="${element.github}"><img src="/images/icons/github.svg"></a>`
                    }
                    if (element.web) {
                        links += `<a href="${element.web}"><img src="/images/icons/world.png"></a>`
                    }
                    item.querySelector(".links").innerHTML = links

                    var clone = document.importNode(item, true)
                    document.querySelector(location).appendChild(clone)

                    var nestedRequest = new XMLHttpRequest()
                    nestedRequest.open('GET', `/api/tag/${element.tag}`, true)

                    nestedRequest.onload = function() {
                        let posts = JSON.parse(this.response)
                        if (posts.length == 0) {
                            let el = document.querySelector(`#id-${tag} > .overview`)
                            while (el.childElementCount > 1) {
                                el.removeChild(el.lastChild)
                            }
                            return
                        }
                        posts.forEach(el => {
                            document.querySelector(`#id-${tag} > .overview > ul`)
                            .insertAdjacentHTML("afterend", `<li><a class="text-link" href="/articles/${el.id}">${el.title}</a></ul>`)
                        })
                    }

                    nestedRequest.send()
                })
            }
        }

        request.send()
    }
    
    static single(id) {
        var request = new XMLHttpRequest()
        request.open('GET', `/api/portfolio/${id}`, true)

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let result = JSON.parse(this.response)
                document.title = result.title
                document.querySelector("#editor").innerHTML = `Editing: ${result.title}`
                document.querySelector("#icon").setAttribute("value",  result.icon || "")
            }
        }

        request.send()
    }
}
