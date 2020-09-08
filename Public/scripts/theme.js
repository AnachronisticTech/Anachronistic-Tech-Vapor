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
            weightCSS("bold")
            $(".bold").html("Normal text")
        }
        if (theme.charAt(4) == "1") { // set large text
            sizeCSS("large")
            $(".large").html("Smaller text")
        }
    }

    function themeCSS(theme) {
        let root = document.documentElement;
        switch (theme) {
            case "light":
                root.style.setProperty("--background-color", "#fefefe")
                root.style.setProperty("--container-color", "#ececec")
                root.style.setProperty("--container-hover-color", "#bbb")
                root.style.setProperty("--container-htext-color", "#111")
                root.style.setProperty("--divider-color", "#444")
                root.style.setProperty("--sidebox-border-color", "#555")
                root.style.setProperty("--title-color", "#999")
                root.style.setProperty("--text-color", "#777")
                root.style.setProperty("--text-emphasis-color", "#111")
                root.style.setProperty("--post-hover-color", "#111")
                root.style.setProperty("--post-bghover-color", "#fefefe")
                root.style.setProperty("--link-color", "#111")
                root.style.setProperty("--link-hover-color", "#111")
                root.style.setProperty("--link-background-color", "#fefefe")
                root.style.setProperty("--link-underline-color", "#000")
                root.style.setProperty("--link-hunderline-size", "4px")
                root.style.setProperty("--glyph-filter", "0%")
                root.style.setProperty("--glyph-hover-filter", "0%")
                break
            case "dark":
                root.style.setProperty("--background-color", "#333")
                root.style.setProperty("--container-color", "#555")
                root.style.setProperty("--container-hover-color", "#888")
                root.style.setProperty("--container-htext-color", "#f7f7f7")
                root.style.setProperty("--divider-color", "#f7f7f7")
                root.style.setProperty("--sidebox-border-color", "#ddd")
                root.style.setProperty("--title-color", "#f7f7f7")
                root.style.setProperty("--text-color", "#b7b7b7")
                root.style.setProperty("--text-emphasis-color", "#f7f7f7")
                root.style.setProperty("--post-hover-color", "#eee")
                root.style.setProperty("--post-bghover-color", "#333")
                root.style.setProperty("--link-color", "#eee")
                root.style.setProperty("--link-hover-color", "#eee")
                root.style.setProperty("--link-background-color", "#333")
                root.style.setProperty("--link-underline-color", "#fff")
                root.style.setProperty("--link-hunderline-size", "4px")
                root.style.setProperty("--glyph-filter", "100%")
                root.style.setProperty("--glyph-hover-filter", "100%")
                break
            case "light_hc":
                root.style.setProperty("--background-color", "#fff")
                root.style.setProperty("--container-color", "#fff")
                root.style.setProperty("--container-hover-color", "#111")
                root.style.setProperty("--container-htext-color", "#fff")
                root.style.setProperty("--divider-color", "#000")
                root.style.setProperty("--sidebox-border-color", "#111")
                root.style.setProperty("--title-color", "#111")
                root.style.setProperty("--text-color", "#000")
                root.style.setProperty("--text-emphasis-color", "#000")
                root.style.setProperty("--post-hover-color", "#fff")
                root.style.setProperty("--post-bghover-color", "#111")
                root.style.setProperty("--link-color", "#000")
                root.style.setProperty("--link-hover-color", "#fff")
                root.style.setProperty("--link-background-color", "#000")
                root.style.setProperty("--link-underline-color", "#000")
                root.style.setProperty("--link-hunderline-size", "1px")
                root.style.setProperty("--glyph-filter", "0%")
                root.style.setProperty("--glyph-hover-filter", "100%")
                break
            case "dark_hc":
                root.style.setProperty("--background-color", "#111")
                root.style.setProperty("--container-color", "#111")
                root.style.setProperty("--container-hover-color", "#fff")
                root.style.setProperty("--container-htext-color", "#111")
                root.style.setProperty("--divider-color", "#fff")
                root.style.setProperty("--sidebox-border-color", "#fff")
                root.style.setProperty("--title-color", "#fff")
                root.style.setProperty("--text-color", "#fff")
                root.style.setProperty("--text-emphasis-color", "#fff")
                root.style.setProperty("--post-hover-color", "#111")
                root.style.setProperty("--post-bghover-color", "#fff")
                root.style.setProperty("--link-color", "#fff")
                root.style.setProperty("--link-hover-color", "#000")
                root.style.setProperty("--link-background-color", "#fff")
                root.style.setProperty("--link-underline-color", "#fff")
                root.style.setProperty("--link-hunderline-size", "1px")
                root.style.setProperty("--glyph-filter", "100%")
                root.style.setProperty("--glyph-hover-filter", "0%")
                break
        }
    }

    function sizeCSS(size) {
        let root = document.documentElement;
        switch (size) {
            case "regular":
                root.style.setProperty("--title-size-large", "60px")
                root.style.setProperty("--title-size-medium", "50px")
                root.style.setProperty("--title-size-small", "40px")
                root.style.setProperty("--article-title-size", "40px")
                root.style.setProperty("--link-title-size", "30px")
                root.style.setProperty("--subheading-size", "24px")
                root.style.setProperty("--subtitle-size", "20px")
                root.style.setProperty("--date-size", "16px")
                root.style.setProperty("--paragraph-text-size", "18px")
                root.style.setProperty("--aside-text-size", "16px")
                break
            case "large":
                root.style.setProperty("--title-size-large", "80px")
                root.style.setProperty("--title-size-medium", "55px")
                root.style.setProperty("--title-size-small", "45px")
                root.style.setProperty("--article-title-size", "50px")
                root.style.setProperty("--link-title-size", "40px")
                root.style.setProperty("--subheading-size", "28px")
                root.style.setProperty("--subtitle-size", "24px")
                root.style.setProperty("--date-size", "18px")
                root.style.setProperty("--paragraph-text-size", "25px")
                root.style.setProperty("--aside-text-size", "24px")
                break
        }
    }

    function weightCSS(weight) {
        let root = document.documentElement;
        switch (weight) {
            case "regular":
                root.style.setProperty("--font-weight-a", "normal")
                root.style.setProperty("--font-weight-b", "normal")
                break
            case "bold":
                root.style.setProperty("--font-weight-a", "700")
                root.style.setProperty("--font-weight-b", "500")
                break
        }
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
            weightCSS("bold")
            Cookies.set("theme", newTheme(theme, 3, 1))
            $(".bold").html("Normal text")
        } else {
            weightCSS("regular")
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
