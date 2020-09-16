ready(function() {
    function homeHandler() { window.location.href = "/" }
    document.querySelector("#home").addEventListener("click", homeHandler)
    document.querySelector("#home").addEventListener("touchstart", homeHandler)

    function archiveHandler() { window.location.href = "/archive"}
    document.querySelector("#archive").addEventListener("click", archiveHandler)
    document.querySelector("#archive").addEventListener("touchstart", archiveHandler)

    function portfolioHandler() { window.location.href = "/portfolio" }
    document.querySelector("#portfolio").addEventListener("click", portfolioHandler)
    document.querySelector("#portfolio").addEventListener("touchstart", portfolioHandler)

    function contactHandler() { window.location.href = "/contact" }
    document.querySelector("#contact").addEventListener("click", contactHandler)
    document.querySelector("#contact").addEventListener("touchstart", contactHandler)

    var handled = false
    function settings() {
        let nav = document.querySelector("nav")
        let menu = document.querySelector("#menu-layer-2")
        if (menu.classList.contains("button-height")) {
            nav.classList.remove("max-height")
            menu.classList.remove("button-height")
            Array.from(menu.children).forEach(element => {
                element.classList.remove("visible")
                element.classList.add("hidden")
            });
        } else {
            nav.classList.add("max-height")
            menu.classList.add("button-height")
            Array.from(menu.children).forEach(element => {
                element.classList.add("visible")
                element.classList.remove("hidden")
            });
        }
    }
    function settingsHandler(e) {
        e.stopPropagation()
        if (e.type == "touchend") {
            this.removeEventListener("click")
            handled = true
            settings()
        } else if (e.type == "click" && !handled) {
            settings()
        } else {
            handled = false
        }
    }
    document.querySelector("#settings").addEventListener("click", settingsHandler)
    document.querySelector("#settings").addEventListener("touchend", settingsHandler)
})
