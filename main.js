import AviaService from "./js/aviaService.js"

const Avia = new AviaService()




Avia.getkey()
const btn = document.querySelector('.btn')
btn.addEventListener('click', Avia.getTickets)


