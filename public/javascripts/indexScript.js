function calc() {
    var html=document.documentElement
    width=html.clientWidth>640?640:html.clientWidth
    html.style.fontSize=20*(width/320)+"px"
    // console.log(html.style.fontSize)
}
window.addEventListener("resize",calc)
calc()