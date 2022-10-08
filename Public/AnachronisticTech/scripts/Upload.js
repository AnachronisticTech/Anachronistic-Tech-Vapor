class Upload {
    static form(id) {
        let result = document.querySelector("#result")
        result.classList.remove("hidden")
        result.classList.remove("success")
        result.classList.remove("error")
        result.classList.add("information")
        result.innerHTML = "<b>Uploading</b>"
        
        var data = new FormData(document.querySelector("form"))
        let name = document.querySelector("form").dataset.name

        var request = new XMLHttpRequest()
        request.open('POST', `/at-api/${name}${id != null ? `/${id}`: ""}`, true)

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                result.classList.remove("hidden")
                result.classList.remove("information")
                result.classList.remove("error")
                result.classList.add("success")
                result.innerHTML = "<b>Success:</b> Upload complete"
            } else {
                result.classList.remove("hidden")
                result.classList.remove("information")
                result.classList.remove("success")
                result.classList.add("error")
                result.innerHTML = `<b>Error:</b> Upload failed: ${this.statusText}`
            }
        }

        request.send(data);
    }
}
