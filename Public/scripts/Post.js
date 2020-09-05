class Post {
    static all(postType, limit) {
        var location = postType == null || postType == 0 ? "subBlog" : "subProjects"
        var endpoint = "posts"
        var isSpecific = postType == 0 || postType == 1
        if (postType == 0) { endpoint += "/articles" }
        if (postType == 1) { endpoint += "/projects" }
        if (isSpecific && limit !== null) { endpoint += `/${limit}` }
        $.ajax({
            type: "GET",
            url: `/api/${endpoint}`,
            datatype: "json",
            async: true,
            success: function(result) {
                $.each(result, function() {
                    var post = document.querySelector("#post")
                    post.content.querySelector("a").href = `/articles/${this.id}`
                    post.content.querySelector("#post_title").textContent = this.title
                    post.content.querySelector("#post_summary").textContent = this.summary
                    post.content.querySelector("#post_date").textContent = this.date
                    post.content.querySelector("#post_image").src = (this.icon ? "/images/"+this.icon : "")
    
                    var clone = document.importNode(post.content, true)
                    document.querySelector(`#${location}`).appendChild(clone)
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
                    document.querySelector("#editor").innerHTML = `Editing: ${result.title}`
                    document.querySelector("#icon").setAttribute("value",  result.icon ? result.icon : "")
                } else {
                    document.querySelector("#post_title").textContent = result.title
                    document.querySelector("#post_date").textContent = result.date
                    result.content = result.content.split("</h1>")[1]
                    document.querySelector("#post_content").innerHTML = result.content
                    
                    // Apply syntax highlighting
                    $("pre > code").each(function() {
                        hljs.highlightBlock(this)
                    });
                }
            }
        })
    }
    
    static upload() {
        var data = new FormData($("form")[0])
        $.ajax({
            type: "POST",
            url: `/api/${$("form").data("name")}`,
            cache: false,
            contentType: false,
            processData: false,
            mimeType: "multipart/form-data",
            data: data,
            async: true,
            success: function() {
                $("#result").removeClass("hidden")
                $("#result").removeClass("error")
                $("#result").addClass("success")
                $("#result").html("<b>Success:</b> Uploaded complete")
            },
            error: function(xhr, status, error) {
                $("#result").removeClass("hidden")
                $("#result").removeClass("success")
                $("#result").addClass("error")
                $("#result").html(`<b>Error:</b> Upload failed: ${error}`)
            }
        })
    }
}
