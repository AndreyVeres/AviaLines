import AviaService from "./js/aviaService.js"

const Avia = new AviaService()

// const checkboxs = document.querySelectorAll('[type="checkbox"]')
// console.log(checkboxs)

const checkboxParent = document.querySelector('.forn')

checkboxParent.addEventListener('click', async (e) => {

    if (e.target.getAttribute('data-filter')) {
        // const filter = e.target.getAttribute('data-filter')
        // const data = Avia.getkey()
    }
})


const btn = document.querySelector('.btn')
btn.addEventListener('click', Avia.getResource)


