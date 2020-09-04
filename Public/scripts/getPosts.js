function getPosts(postType, limit, location) {
    var endpoint = "posts";
    var isSpecific = postType == 0 || postType == 1;
    if (postType == 0) { endpoint += "/articles"; }
    if (postType == 1) { endpoint += "/projects"; }
    if (isSpecific && limit !== null) { endpoint += ("/" + limit); }
    $.ajax({
        type:"GET",
        url:"/api/" + endpoint,
        datatype:'json',
        success: function(result) {
            $.each(result, function() {
                var post = document.querySelector('#post');
                post.content.querySelector('a').href = '/articles/'+this.id;
                post.content.querySelector('#post_title').textContent = this.title;
                post.content.querySelector('#post_summary').textContent = this.summary;
                post.content.querySelector('#post_date').textContent = this.date;
                post.content.querySelector('#post_image').src = (this.icon ? '/images/'+this.icon : '');

                var clone = document.importNode(post.content, true);
                document.querySelector('#'+location).appendChild(clone);
            })
        },
        async: true
    });
}
