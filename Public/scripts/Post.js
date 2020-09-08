class Post {
    static all(type, limit) {
        var location = type == null || type == 0 ? "subBlog" : "subProjects"
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
                    var post = $("#post")[0]
                    post.content.querySelector(".post").href = `/articles/${this.id}`
                    post.content.querySelector(".title").textContent = this.title
                    post.content.querySelector(".summary").textContent = this.summary
                    post.content.querySelector(".date").textContent = this.date
                    post.content.querySelector(".icon").src = (this.icon ? `/images/${this.icon}` : "")
    
                    var clone = document.importNode(post.content, true)
                    $(`#${location}`).append(clone)
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
