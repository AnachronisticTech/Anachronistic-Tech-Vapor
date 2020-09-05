function getPost(id, full) {
    $.ajax({
        type:"GET",
        url:"/api/posts/" + id,
        datatype:"json",
        async: true,
        success: function(result) {
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
            document.title = result.title
        }
    })
}
