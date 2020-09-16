ready(function() {
    // Cookies.remove("theme") // DEBUG

    if (Cookies.get("theme") == null) {
        Cookies.set("theme", "t0000") // contrast, style, weight, size
    } else {
        let theme = Cookies.get("theme")
        themeCSS(theme.charAt(1), theme.charAt(2))
        weightCSS(theme.charAt(3))
        sizeCSS(theme.charAt(4))
    }

    function themeCSS(contrast, style) {
        let root = document.documentElement;
        let themeText = ""
        let contrastText = ""
        switch (`${contrast}${style}`) {
            case "01": // dark
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
                root.style.setProperty("--post-bghover-color", "rgba(0,0,0,0)")
                root.style.setProperty("--link-color", "#eee")
                root.style.setProperty("--link-hover-color", "#eee")
                root.style.setProperty("--link-background-color", "rgba(0,0,0,0)")
                root.style.setProperty("--link-underline-color", "#fff")
                root.style.setProperty("--link-hunderline-size", "4px")
                root.style.setProperty("--contrast-divider-size", "0px")
                root.style.setProperty("--glyph-filter", "100%")
                root.style.setProperty("--glyph-hover-filter", "100%")
                themeText = "Light mode"
                contrastText = "High contrast"
                break
            case "10": // light, high contrast
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
                root.style.setProperty("--contrast-divider-size", "2px")
                root.style.setProperty("--glyph-filter", "0%")
                root.style.setProperty("--glyph-hover-filter", "100%")
                themeText = "Dark mode"
                contrastText = "Low contrast"
                break
            case "11": // dark, high contrast
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
                root.style.setProperty("--contrast-divider-size", "2px")
                root.style.setProperty("--glyph-filter", "100%")
                root.style.setProperty("--glyph-hover-filter", "0%")
                themeText = "Light mode"
                contrastText = "Low contrast"
                break
            default: // light
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
                root.style.setProperty("--post-bghover-color", "rgba(0,0,0,0)")
                root.style.setProperty("--link-color", "#111")
                root.style.setProperty("--link-hover-color", "#111")
                root.style.setProperty("--link-background-color", "rgba(0,0,0,0)")
                root.style.setProperty("--link-underline-color", "#000")
                root.style.setProperty("--link-hunderline-size", "4px")
                root.style.setProperty("--contrast-divider-size", "0px")
                root.style.setProperty("--glyph-filter", "0%")
                root.style.setProperty("--glyph-hover-filter", "0%")
                themeText = "Dark mode"
                contrastText = "High contrast"
                break
        }
        document.querySelector(".dark").innerHTML = themeText
        document.querySelector(".contrast").innerHTML = contrastText
        let cookie = Cookies.get("theme")
        Cookies.set("theme", newTheme(cookie, 1, contrast))
        cookie = Cookies.get("theme")
        Cookies.set("theme", newTheme(cookie, 2, style))
    }

    function weightCSS(weight) {
        let root = document.documentElement;
        let weightText = ""
        switch (weight) {
            case "bold", "1":
                root.style.setProperty("--font-weight-a", "700")
                root.style.setProperty("--font-weight-b", "500")
                weightText = "Normal text"
                break
            default:
                root.style.setProperty("--font-weight-a", "normal")
                root.style.setProperty("--font-weight-b", "normal")
                weightText = "Bolder text"
                break
        }
        document.querySelector(".bold").innerHTML = weightText
        let cookie = Cookies.get("theme")
        Cookies.set("theme", newTheme(cookie, 3, weight))
    }

    function sizeCSS(size) {
        let root = document.documentElement;
        let sizeText = ""
        switch (size) {
            case "1":
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
                sizeText = "Smaller text"
                break
            default:
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
                sizeText = "Larger text"
                break
        }
        document.querySelector(".large").innerHTML = sizeText
        let cookie = Cookies.get("theme")
        Cookies.set("theme", newTheme(cookie, 4, size))
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

    function contrastHandler(e) {
        let theme = Cookies.get("theme")
        themeCSS(theme.charAt(1) == "0" ? "1" : "0", theme.charAt(2))
    }
    document.querySelector(".contrast").addEventListener("click", contrastHandler)
    document.querySelector(".contrast").addEventListener("touchstart", contrastHandler)

    function styleHandler(e) {
        let theme = Cookies.get("theme")
        themeCSS(theme.charAt(1), theme.charAt(2) == "0" ? "1" : "0")
    }
    document.querySelector(".dark").addEventListener("click", styleHandler)
    document.querySelector(".dark").addEventListener("touchstart", styleHandler)

    function weightHandler(e) {
        let theme = Cookies.get("theme")
        weightCSS(theme.charAt(3) == "0" ? "1" : "0")
    }
    document.querySelector(".bold").addEventListener("click", weightHandler)
    document.querySelector(".bold").addEventListener("touchstart", weightHandler)

    function sizeHandler(e) {
        let theme = Cookies.get("theme")
        sizeCSS(theme.charAt(4) == "0" ? "1" : "0")
    }
    document.querySelector(".large").addEventListener("click", sizeHandler)
    document.querySelector(".large").addEventListener("touchstart", sizeHandler)
})
