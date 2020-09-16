class Image {
    static all() {
        var request = new XMLHttpRequest()
        request.open('GET', "/api/images", true)

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let data = JSON.parse(this.response)
                document.querySelector("#imgscroller").innerHTML = ""
                data.forEach(element => {
                    let image = document.querySelector("#image").content
                    image.querySelector("img").src = `/images/${element}`
                    var clone = document.importNode(image, true)
                    document.querySelector("#imgscroller").appendChild(clone)
                })
                let imgScroller = document.querySelector("#imgscroller")
                Array.from(imgScroller.children).forEach(element => {
                    element.addEventListener("click", function() {
                        let path = element.getAttribute("src").slice(8)
                        document.querySelector("#icon").value = path
                    })
                })
            }
        }

        request.send()
    }
}