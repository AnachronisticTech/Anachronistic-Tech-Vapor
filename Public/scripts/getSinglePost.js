function getPost(id, full) {
    $.ajax({
        type:"GET",
        url:"/api/posts/" + id,
        datatype:'json',
        success: function(result) {
            if (!full) {
                document.querySelector('#post_title').textContent = result.title;
                document.querySelector('#post_date').textContent = result.date;
            
                var converter = new showdown.Converter();
                converter.setFlavor('original');
                converter.setOption('strikethrough', 'true');
                converter.setOption('ghCodeBlocks', 'true');

                // Convert markdown images to article images and videos
                var arr = result.content.split(/(!\[([a-zA-Z0-9\s\!\.\'\-_,\(\)]*)\]\(([a-zA-Z0-9\-_]*\.(jpg|jpeg|png|mp4))\))/);
                for (i = 0; i < arr.length; i++) {
                    if (arr[i] == "jpg" || arr[i] == "jpeg" || arr[i] == "png") {
                        arr[i - 3] = '<div class="inlineImg"><img src="images/';
                        arr[i] = '"><h5>'+arr[i - 2]+'</h5></div>';
                        arr[i - 2] = '';
                    } else if (arr[i] == "mp4") {
                        arr[i - 3] = '<div class="inlineImg"><video width="100%" height="auto" controls><source src="images/';
                        arr[i] = '" type="video/mp4"></video><h5>'+arr[i - 2]+'</h5></div>';
                        arr[i - 2] = '';
                    }
                }
                
                // Reassemble the post
                var string = "";
                for (i = 0; i < arr.length; i++) {
                    string += arr[i];
                }

                string = string.split("</h1>")[1];
                document.querySelector('#post_content').innerHTML = converter.makeHtml(string);
                
                // Apply syntax highlighting
                $('pre > code').each(function() {
                    hljs.highlightBlock(this);
                });
            } else {
                document.querySelector('#editor').innerHTML = "Editing: " + result.title;
                document.querySelector('#icon').setAttribute('value',  result.icon ? result.icon : '');

                if (result.type == 0) {
                    document.querySelector('#type_article').setAttribute('checked',  'true');
                } else {
                    document.querySelector('#type_project').setAttribute('checked',  'true');
                }
            
            }
            document.title = result.title;
        },
        async: true
    });
}
