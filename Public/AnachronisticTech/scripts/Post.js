class Post {
    static all(type, limit, location) {
        location == null ? location = ".sublist" : location = `#${location}`
        var endpoint = "posts"
        var isSpecific = type == 0 || type == 1
        if (type == 0) { endpoint += "/articles" }
        if (type == 1) { endpoint += "/projects" }
        if (isSpecific && limit !== null) { endpoint += `/${limit}` }

        var request = new XMLHttpRequest()
        request.open('GET', `/at-api/${endpoint}`, true)

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let data = JSON.parse(this.response)
                data.forEach(el => {
                    let post = document.querySelector("#post").content
                    post.querySelector(".post").href = `/articles/${el.id}`
                    post.querySelector(".title").textContent = el.title
                    post.querySelector(".summary").textContent = el.summary
                    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                    el.date = (new Date(el.date)).toLocaleDateString("en-US", options)
                    post.querySelector(".date").textContent = el.date
                    post.querySelector(".icon").src = (el.icon ? `/AnachronisticTech/content/images/${el.icon}` : "")
    
                    var clone = document.importNode(post, true)
                    document.querySelector(location).appendChild(clone)
                })
            }
        }

        request.send()
    }
    
    static single(id, full = true) {
        var request = new XMLHttpRequest()
        request.open('GET', `/at-api/posts/${id}`, true)

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let result = JSON.parse(this.response)
                document.title = result.title
                if (full) {
                    document.querySelector("#editor").innerHTML = `Editing: ${result.title}`
                    document.querySelector("#icon").value = result.icon || ""
                } else {
                    document.querySelector("article > h2").innerHTML = result.title
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                    result.date = (new Date(result.date)).toLocaleDateString("en-US", options)
                    document.querySelector("article > h6").innerHTML = result.date
                    result.content = result.content.split("</h1>")[1]
                    document.querySelector("article > div").innerHTML = result.content
                    
                    // Apply syntax highlighting
                    let codeBlocks = document.querySelectorAll("pre > code")
                    Array.from(codeBlocks).forEach(element => {
                        hljs.highlightBlock(element)
                    })
                }
            }
        }

        request.send()
    }
}
