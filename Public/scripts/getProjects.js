function getProjects() {
    $.ajax({
        type:"POST",
        url:"../scripts/getProjects.php",
        datatype:'json',
        success: function(data) {
            var result = JSON.parse(data);
            $.each(result, function() {
                var post = document.querySelector('#project');
                post.content.querySelector('img').src = (this.thumbnail ? 'images/'+this.thumbnail : '');
                post.content.querySelector('.icon').querySelector('h5').textContent = this.title;
                post.content.querySelector('.icon').querySelector('p').textContent = this.short;
                post.content.querySelector('.detail').querySelector('h5').textContent = this.title;
                post.content.querySelector('.detail').querySelector('.summary').textContent = this.summary;
                var icons = (this.source ? '<a href="'+this.source+'"><img src="../images/github.svg"></a>' : '') + (this.link ? '<a href="'+this.link+'"><img src="../images/world.png"></a>' : '');
                post.content.querySelector('.link').innerHTML = icons;

                var clone = document.importNode(post.content, true);
                document.querySelector('#content').appendChild(clone);
            });
            $('#content').children().each(function() {
                $(this).on('click', function() {
                    if ($(document).width() <= 575) { return false; }
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
        },
        async: true
    });
}