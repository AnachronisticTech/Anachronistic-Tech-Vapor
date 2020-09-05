function getProjects() {
    $.ajax({
        type:"GET",
        url:"/api/projects",
        datatype:"json",
        async: true,
        success: function(result) {
            $.each(result, function() {
                var post = document.querySelector("#project")
                post.content.querySelector("img").src = (this.image ? `/images/${this.image}` : "")
                post.content.querySelector(".icon").querySelector("h5").textContent = this.title
                post.content.querySelector(".icon").querySelector("p").textContent = this.short
                post.content.querySelector(".detail").querySelector("h5").textContent = this.title
                post.content.querySelector(".detail").querySelector(".summary").textContent = this.summary
                var icons = (this.source ? `<a href="${this.source}"><img src="/images/icons/github.svg"></a>` : "") + (this.link ? `<a href="${this.link}"><img src="/images/icons/world.png"></a>` : "")
                post.content.querySelector(".link").innerHTML = icons

                var clone = document.importNode(post.content, true)
                document.querySelector("#content").appendChild(clone)
            })
            $("#content").children().each(function() {
                $(this).on("click", function() {
                    if ($(document).width() <= 575) { return false }
                    if ($(this).hasClass("narrow")) {
                        $(this).removeClass("narrow")
                        $(this).addClass("wide")
                        // window.scrollTo(0, $(this).get(0).getBoundingClientRect().top - 100)
                    } else {
                        $(this).removeClass("wide")
                        $(this).addClass("narrow")
                    }
                })
            })
        }
    })
}
