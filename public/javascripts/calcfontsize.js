function calc() {
    var html = document.documentElement
    width = html.clientWidth
    if (width <= 768) {
        html.style.fontSize = 20 * (width / 384) + "px"
    }

    // console.log(html.style.fontSize)
}

window.addEventListener("resize", calc)
calc()

//禁止左滑后退
// document.addEventListener("touchmove", function (ev) {
//     ev.preventDefault()
// }, false);
