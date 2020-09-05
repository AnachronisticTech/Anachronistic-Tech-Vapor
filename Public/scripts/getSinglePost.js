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

                // This may all be unnecessary now!
                var converter = new showdown.Converter()
                converter.setFlavor("original")
                converter.setOption("strikethrough", "true")
                converter.setOption("ghCodeBlocks", "true")

                document.querySelector("#post_content").innerHTML = converter.makeHtml(result.content)
                
                // Apply syntax highlighting
                $("pre > code").each(function() {
                    hljs.highlightBlock(this)
                });
            }
            document.title = result.title
        }
    })
}
