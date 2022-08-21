import AviaService from "./js/service.js"

const Avia = new AviaService()





const btn = document.querySelector('.btn')
btn.addEventListener('click', Avia.getKey)



