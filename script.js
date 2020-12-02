function setHeight () {
  document.querySelector('.header').style.height = window.innerWidth <= 768
    ? window.innerHeight + 'px'
    : 'auto'
}
setHeight()
window.addEventListener('resize', setHeight)
console.log('asd')