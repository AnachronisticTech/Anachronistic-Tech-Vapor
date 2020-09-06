$(document).ready( function() {
    $("#nav").on("click touchstart", "#home", function(e) {
        if (e.type == "touchstart") {
            $(this).off("click")
        }
        window.location.href = "/"
    })

    $("#nav").on("click touchstart", "#archive", function(e) {
        if (e.type == "touchstart") {
            $(this).off("click")
        }
        window.location.href = "/archive"
    })

    $("#nav").on("click touchstart", "#projects", function(e) {
        if (e.type == "touchstart") {
            $(this).off("click")
        }
        window.location.href = "/portfolio"
    })

    $("#nav").on("click touchstart", "#contact", function(e) {
        if (e.type == "touchstart") {
            $(this).off("click")
        }
        window.location.href = "/contact"
    })

    var handled = false
    function settings() {
        if ($("#menu-layer-2").hasClass("button-height")) {
            $("#nav").removeClass("max-height")
            $("#menu-layer-2").removeClass("button-height")
            $("#menu-layer-2").children().css("display","none")
        } else {
            $("#nav").addClass("max-height")
            $("#menu-layer-2").addClass("button-height")
            $("#menu-layer-2").children().css("display","initial")
            $("#menu-layer-2").children().css("vertical-align","top")
        }
    }

    $("#nav").on("click touchstart", "#settings", function(e) {
        e.stopPropagation()
        if (e.type == "touchend") {
            $(this).off("click")
            handled = true
            settings()
        } else if (e.type == "click" && !handled) {
            settings()
        } else {
            handled = false
        }
    })
})
