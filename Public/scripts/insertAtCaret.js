function insertAtCaret(field, text) {
    if (!field || field == "" || field === null) { return }
    var textarea = document.getElementById(field)
    if (textarea.getAttribute("type") == "text") {
        textarea.value = ""
    }

    var scrollPos = textarea.scrollTop
    var strPos = 0
    var br = ((textarea.selectionStart || textarea.selectionStart == "0") ?
        "ff" : (document.selection ? "ie" : false))
    if (br == "ie") {
        textarea.focus()
        var range = document.selection.createRange()
        range.moveStart("character", -textarea.value.length)
        strPos = range.text.length
    } else if (br == "ff") {
        strPos = textarea.selectionStart
    }

    var front = (textarea.value).substring(0, strPos)
    var back = (textarea.value).substring(strPos, textarea.value.length)
    textarea.value = front + text + back
    strPos = strPos + text.length
    if (br == "ie") {
        textarea.focus()
        var ieRange = document.selection.createRange()
        ieRange.moveStart("character", -textarea.value.length)
        ieRange.moveStart("character", strPos)
        ieRange.moveEnd("character", 0)
        ieRange.select()
    } else if (br == "ff") {
        textarea.selectionStart = strPos
        textarea.selectionEnd = strPos
        textarea.focus()
    }

    textarea.scrollTop = scrollPos
}