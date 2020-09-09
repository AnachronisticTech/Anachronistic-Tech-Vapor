class Portfolio {
    static all(type, limit, location) {
        location == null ? location = ".sublist" : location = `#${location}`
        var endpoint = "portfolio"
        var isSpecific = type == 0 || type == 1
        if (type == 0) { endpoint += "/interests" }
        if (type == 1) { endpoint += "/projects" }
        if (isSpecific && limit !== null) { endpoint += `/${limit}` }
        $.ajax({
            type: "GET",
            url: `/api/${endpoint}`,
            datatype: "json",
            async: true,
            success: function(result) {
                $.each(result, function() {
                    var item = $("#item")[0].content
                    var tag = this.tag
                    item.querySelector(".item").setAttribute("id", `id-${this.tag}`)
                    item.querySelector(".detail > h3").textContent = this.title
                    item.querySelector(".detail > p").textContent = this.subtitle

                    var parser = new DOMParser()
                    var content = parser
                        .parseFromString(this.content, 'text/html')
                        .body.lastChild.textContent
                    item.querySelector(".overview > p").innerHTML = content
                    item.querySelector(".icon").src = (this.icon ? `/images/${this.icon}` : "")
                    var links = ""
                    if (this.github) {
                        links += `<a href="${this.github}"><img src="/images/icons/github.svg"></a>`
                    }
                    if (this.web) {
                        links += `<a href="${this.web}"><img src="/images/icons/world.png"></a>`
                    }
                    item.querySelector(".links").innerHTML = links
    
                    var clone = document.importNode(item, true)
                    $(location).append(clone)

                    $.ajax({
                        type: "GET",
                        url: `/api/tag/${this.tag}`,
                        datatype: "json",
                        async: true,
                        success: function(posts) {
                            if (posts.length == 0) {
                                $(`#id-${tag} > .overview > hr`).remove()
                                $(`#id-${tag} > .overview > h5`).remove()
                                $(`#id-${tag} > .overview > ul`).remove()
                                return
                            }
                            $.each(posts, function(index) {
                                var post = posts[index]
                                $(`#id-${tag} > .overview > ul`)
                                    .append(`<li><a class="text-link" href="/articles/${post.id}">${post.title}</a></ul>`)
                            })
                        }
                    })
                })
            }
        })
    }
    
    static single(id) {
        $.ajax({
            type: "GET",
            url: `/api/portfolio/${id}`,
            datatype: "json",
            async: true,
            success: function(result) {
                document.title = result.title
                $("#editor").html(`Editing: ${result.title}`)
                $("#icon").attr("value",  result.icon || "")
            }
        })
    }
}
