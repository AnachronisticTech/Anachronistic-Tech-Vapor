class Upload {
    static form(id) {
        $("#result").removeClass("hidden")
        $("#result").removeClass("success")
        $("#result").removeClass("error")
        $("#result").addClass("information")
        $("#result").html("<b>Uploading</b>")
        
        var data = new FormData($("form")[0])
        $.ajax({
            type: "POST",
            url: `/api/${$("form").data("name")}${id != null ? `/${id}`: ""}`,
            cache: false,
            contentType: false,
            processData: false,
            mimeType: "multipart/form-data",
            data: data,
            async: true,
            success: function() {
                $("#result").removeClass("hidden")
                $("#result").removeClass("information")
                $("#result").removeClass("error")
                $("#result").addClass("success")
                $("#result").html("<b>Success:</b> Upload complete")
            },
            error: function(xhr, status, error) {
                $("#result").removeClass("hidden")
                $("#result").removeClass("information")
                $("#result").removeClass("success")
                $("#result").addClass("error")
                $("#result").html(`<b>Error:</b> Upload failed: ${error}`)
            }
        })
    }
}