function getImages() {
    $.ajax({
        type:"POST",
        url:"../scripts/getImages.php",
        datatype:'json',
        success: function(data) {
            document.querySelector('#imgscroller').textContent = '';
            var result = JSON.parse(data);
            $.each(result, function(_, path) {
                var image = document.querySelector('#image');
                image.content.querySelector('img').src = 'images/'+path;
                var clone = document.importNode(image.content, true);
                document.querySelector('#imgscroller').appendChild(clone);
            });
            $('#imgscroller').children().each(function() {
                $(this).on('click', function() {
                    var path = $(this).attr('src');
                    path = path.slice(7)
                    setPath(path);
                })
            })
        },
        async: true
    });
}