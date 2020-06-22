const rem = () => {
  let htmlDom = document.querySelector('html')
  let htmlWidth = htmlDom.clientWidth || document.body.clientWidth
  htmlWidth >= 750 && (htmlWidth = 750)
  htmlWidth <= 320 && (htmlWidth = 320)
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
}

window.onresize = rem
rem()
