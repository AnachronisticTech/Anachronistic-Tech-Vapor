class Image {
    static all() {
        $.ajax({
            type:"GET",
            url:"/api/images",
            datatype:"json",
            async: true,
            success: function(data) {
                $("#imgscroller").html("")
                $.each(data, function(_, path) {
                    var image = $("#image")[0]
                    image.content.querySelector("img").src = `/images/${path}`
                    var clone = document.importNode(image.content, true)
                    $("#imgscroller").append(clone)
                })
                $("#imgscroller").children().each(function() {
                    $(this).on("click", function() {
                        var path = $(this).attr("src").slice(8)
                        $("#icon").val(path)
                    })
                })
            }
        })
    }
}