class Post {
    static all(type, limit, location) {
        location == null ? location = ".sublist" : location = `#${location}`
        var endpoint = "posts"
        var isSpecific = type == 0 || type == 1
        if (type == 0) { endpoint += "/articles" }
        if (type == 1) { endpoint += "/projects" }
        if (isSpecific && limit !== null) { endpoint += `/${limit}` }
        $.ajax({
            type: "GET",
            url: `/api/${endpoint}`,
            datatype: "json",
            async: true,
            success: function(result) {
                $.each(result, function() {
                    this.title = this.title.replace("&amp;", "&")
                    this.summary = this.summary.replace("&amp;", "&")
                    var post = $("#post")[0].content
                    post.querySelector(".post").href = `/articles/${this.id}`
                    post.querySelector(".title").textContent = this.title
                    post.querySelector(".summary").textContent = this.summary
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                    this.date = (new Date(this.date)).toLocaleDateString("en-US", options)
                    post.querySelector(".date").textContent = this.date
                    post.querySelector(".icon").src = (this.icon ? `/images/${this.icon}` : "")
    
                    var clone = document.importNode(post, true)
                    $(location).append(clone)
                })
            }
        })
    }
    
    static single(id, full = true) {
        $.ajax({
            type: "GET",
            url: `/api/posts/${id}`,
            datatype: "json",
            async: true,
            success: function(result) {
                document.title = result.title
                if (full) {
                    $("#editor").html(`Editing: ${result.title}`)
                    $("#icon").attr("value",  result.icon || "")
                } else {
                    $("article > h2").html(result.title)
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                    result.date = (new Date(result.date)).toLocaleDateString("en-US", options)
                    $("article > h6").html(result.date)
                    result.content = result.content.split("</h1>")[1]
                    $("article > div").html(result.content)
                    
                    // Apply syntax highlighting
                    $("pre > code").each(function() {
                        hljs.highlightBlock(this)
                    });
                }
            }
        })
    }
}
