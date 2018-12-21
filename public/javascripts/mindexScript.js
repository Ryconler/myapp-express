function calc() {
    var html=document.documentElement
    width=html.clientWidth>768?768:html.clientWidth
    html.style.fontSize=30*(width/384)+"px"
    // console.log(html.style.fontSize)
}
window.addEventListener("resize",calc)
calc()