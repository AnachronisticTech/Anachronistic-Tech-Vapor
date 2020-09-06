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
                    post.content.querySelector("a").href = `/articles/${this.id}`
                    post.content.querySelector("#post_title").textContent = this.title
                    post.content.querySelector("#post_summary").textContent = this.summary
                    post.content.querySelector("#post_date").textContent = this.date
                    post.content.querySelector("#post_image").src = (this.icon ? `/images/${this.icon}` : "")
    
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
                    $("#post_title").html(result.title)
                    $("#post_date").html(result.date)
                    result.content = result.content.split("</h1>")[1]
                    $("#post_content").html(result.content)
                    
                    // Apply syntax highlighting
                    $("pre > code").each(function() {
                        hljs.highlightBlock(this)
                    });
                }
            }
        })
    }
}
