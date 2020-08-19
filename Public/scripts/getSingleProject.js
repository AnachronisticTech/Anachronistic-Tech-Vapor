function getProject(id) {
    $.ajax({
        type:"POST",
        url:"../scripts/getSingleProject.php",
        data:{"id":id},
        datatype:'json',
        success: function(data) {
            var result = JSON.parse(data);
            
            document.querySelector('#post_id').setAttribute('value',  result.id);
            document.querySelector('#post_title').setAttribute('value',  result.title);
            document.querySelector('#post_short').setAttribute('value',  result.short);
            document.querySelector('#post_link').setAttribute('value',  result.link);
            document.querySelector('#post_summary').textContent = result.summary;
            document.querySelector('#post_image').setAttribute('value',  result.thumbnail ? result.thumbnail : '');
            
            document.title = result.title;
        },
        async: true
    });
}