import AviaService from "./js/aviaService.js"

const Avia = new AviaService()



// const show = document.querySelector('.show')
// show.addEventListener('click', Avia.show)
// Avia.getkey()
const btn = document.querySelector('.btn')
btn.addEventListener('click', Avia.getkey)


