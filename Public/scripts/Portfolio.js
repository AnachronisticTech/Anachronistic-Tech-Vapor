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
                $.each(result, function(index) {
                    var item = $("#item")[0]
                    item.content.querySelector("#item_content").prepend(this.content)
                    // post.content.querySelector("a").href = `/articles/${this.id}`
                    // post.content.querySelector("#post_title").textContent = this.title
                    // post.content.querySelector("#post_summary").textContent = this.summary
                    // post.content.querySelector("#post_image").src = (this.icon ? `/images/${this.icon}` : "")
    
                    var clone = document.importNode(item.content, true)
                    $(location).append(clone)

                    $.ajax({
                        type: "GET",
                        url: `/api/tag/${this.tag}`,
                        datatype: "json",
                        async: true,
                        success: function(posts) {
                            result[index].posts = posts // might be unneccessary
                        }
                    })
                })
            }
        })
    }
    
    static single(id, full = true) {
        $.ajax({
            type: "GET",
            url: `/api/portfolio/${id}`,
            datatype: "json",
            async: true,
            success: function(result) {
                document.title = result.title
                if (full) {
                    $("#editor").html(`Editing: ${result.title}`)
                    $("#icon").attr("value",  result.icon || "")
                } else {
                    // $("#post_title").html(result.title)
                    // $("#post_date").html(result.date)
                    // result.content = result.content.split("</h1>")[1]
                    // $("#post_content").html(result.content)
                    
                    // // Apply syntax highlighting
                    // $("pre > code").each(function() {
                    //     hljs.highlightBlock(this)
                    // });
                }
            }
        })
    }
}
