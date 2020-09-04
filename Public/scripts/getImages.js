function getImages() {
    $.ajax({
        type:"GET",
        url:"/api/images",
        datatype:'json',
        success: function(data) {
            document.querySelector('#imgscroller').textContent = '';
            $.each(data, function(_, path) {
                var image = document.querySelector('#image');
                image.content.querySelector('img').src = '/images/'+path;
                var clone = document.importNode(image.content, true);
                document.querySelector('#imgscroller').appendChild(clone);
            });
            $('#imgscroller').children().each(function() {
                $(this).on('click', function() {
                    var path = $(this).attr('src');
                    path = path.slice(8)
                    setPath(path);
                })
            })
        },
        async: true
    });
}
