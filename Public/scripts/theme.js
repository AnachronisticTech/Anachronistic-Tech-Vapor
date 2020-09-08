$(document).ready( function() {
    // Cookies.remove("theme") // DEBUG
    // $("#menu-layer-2").css("height", "0px")
    // $("#menu-layer-2").children().css("display", "none")

    if (Cookies.get("theme") == null) {
        Cookies.set("theme", "t0000")
    } else {
        var theme = Cookies.get("theme")
        var scheme = theme.charAt(1) + theme.charAt(2)
        switch (scheme) {
            case "01": // dark
                themeCSS("dark")
                $(".dark").html("Light mode")
                break
            case "10": // hc
                themeCSS("light_hc")
                $(".contrast").html("Low contrast")
                break
            case "11": // dark hc
                themeCSS("dark_hc")
                $(".dark").html("Light mode")
                $(".contrast").html("Low contrast")
                break
        }
        if (theme.charAt(3) == "1") { // set bold text
            $('link[id="fonts"]').attr("href", "/styles/fonts-bold.css")
            $(".bold").html("Normal text")
        }
        if (theme.charAt(4) == "1") { // set large text
            sizeCSS("large")
            $(".large").html("Smaller text")
        }
    }

    function themeCSS(theme) {
        $('link[id="main"]').attr("href", `/styles/${theme}/main.css`)
        $('link[id="blog"]').attr("href", `/styles/${theme}/blog.css`)
        $('link[id="index"]').attr("href", `/styles/${theme}/index.css`)
        $('link[id="article"]').attr("href", `/styles/${theme}/article.css`)
    }

    function sizeCSS(size) {
        $('link[id="main_size"]').attr("href", `/styles/${size}/main.css`)
        $('link[id="blog_size"]').attr("href", `/styles/${size}/blog.css`)
        $('link[id="index_size"]').attr("href", `/styles/${size}/index.css`)
        $('link[id="article_size"]').attr("href", `/styles/${size}/article.css`)
    }

    function newTheme(oldTheme, interestBit, interestBitValue) {
        var newTheme = ""
        for (i = 0; i <= 5; i++) {
            if (i == interestBit) {
                newTheme += `${interestBitValue}`
            } else {
                newTheme += oldTheme.charAt(i)
            }
        }
        return newTheme
    }

    var handled_contrast = false
    function contrast() {
        var theme = Cookies.get("theme")
        if (theme.charAt(1) == "0") {
            themeCSS(theme.charAt(2) == "1" ? "dark_hc" : "light_hc")
            Cookies.set("theme", newTheme(theme, 1, 1))
            $(".contrast").html("Low contrast")
        } else {
            themeCSS(theme.charAt(2) == "1" ? "dark" : "light")
            Cookies.set("theme", newTheme(theme, 1, 0))
            $(".contrast").html("High contrast")
        }
    }
    $("nav").on("click touchstart", ".contrast", function(e) {
        if (e.type == "touchstart") {
            $(this).off("click")
            handled_contrast = true
            contrast()
        } else if (e.type == "click" && !handled_contrast) {
            contrast()
        } else {
            handled_contrast = false
        }
    })

    var handled_brightness = false
    function brightness() {
        var theme = Cookies.get("theme")
        if (theme.charAt(2) == "0") {
            themeCSS(theme.charAt(1) == "1" ? "dark_hc" : "dark")
            Cookies.set("theme", newTheme(theme, 2, 1))
            $(".dark").html("Light mode")
        } else {
            themeCSS(theme.charAt(1) == "1" ? "light_hc" : "light")
            Cookies.set("theme", newTheme(theme, 2, 0))
            $(".dark").html("Dark mode")
        }
    }
    $("nav").on("click touchstart", ".dark", function(e) {
        if (e.type == "touchstart") {
            $(this).off("click")
            handled_brightness = true
            brightness()
        } else if (e.type == "click" && !handled_brightness) {
            brightness()
        } else {
            handled_brightness = false
        }
    })

    var handled_weight = false
    function weight() {
        var theme = Cookies.get("theme")
        if (theme.charAt(3) == "0") {
            $('link[id="fonts"]').attr("href", "/styles/fonts-bold.css")
            Cookies.set("theme", newTheme(theme, 3, 1))
            $(".bold").html("Normal text")
        } else {
            $('link[id="fonts"]').attr("href", "/styles/fonts.css")
            Cookies.set("theme", newTheme(theme, 3, 0))
            $(".bold").html("Bolder text")
        }
    }
    $("nav").on("click touchstart", ".bold", function(e) {
        if (e.type == "touchstart") {
            $(this).off("click")
            handled_weight = true
            weight()
        } else if (e.type == "click" && !handled_weight) {
            weight()
        } else {
            handled_weight = false
        }
    })

    var handled_size = false
    function size() {
        var theme = Cookies.get("theme")
        if (theme.charAt(4) == "0") {
            sizeCSS("large")
            Cookies.set("theme", newTheme(theme, 4, 1))
            $(".large").html("Smaller text")
        } else {
            sizeCSS("regular")
            Cookies.set("theme", newTheme(theme, 4, 0))
            $(".large").html("Larger text")
        }
    }
    $("nav").on("click touchstart", ".large", function(e) {
        if (e.type == "touchstart") {
            $(this).off("click")
            handled_size = true
            size()
        } else if (e.type == "click" && !handled_size) {
            size()
        } else {
            handled_size = false
        }
    })
})
