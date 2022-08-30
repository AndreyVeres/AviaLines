import CreateTicket from "./js/Ticket.js";
const checkboxParent = document.querySelector('.forn')


let allTickets;

checkboxParent.addEventListener('click', (e) => {

    if (e.target.getAttribute('data-filter')) {

        const filter = []
        let checkboxes = document.querySelectorAll('input[name="checkbox"]:checked')

        checkboxes.forEach(item => {
            filter.push(item.getAttribute('data-filter'))
        })
        let test = sortStops(allTickets, filter).slice(0, 5)
        console.log(test)
        test.forEach(item => {
            new CreateTicket(item).render()
        })
    }
})

const getData = async () => {
    let data = []
    let key = ''
    const getkey = async () => {
        data = []
        const res = await fetch('https://front-test.dev.aviasales.ru/search')
            .then(res => res.json())
            .then(res => key = res.searchId)

        getTickets()
    }

    const getTickets = async () => {
        const response = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${key}`)
        if (response.status === 502 || response.status === 500) {
            await getTickets()
        } else if (response.status !== 200) {
            console.error(response.statusText)
            await getTickets();
        } else {
            let ticketsPart = await response.json()
            data = [...data, ...ticketsPart.tickets]
            if (!ticketsPart.stop) {
                await getTickets()
            } else {
                allTickets = data
            }
        }
    }
    getkey()
}

const sortStops = (tickets, filter) => {
    if (filter.includes('all')) return tickets

    return tickets.filter(item => {
        let stops = item.segments[0].stops.length
        if (filter.map(Number).includes(stops)) {
            return item
        }
    })
}
const sortOn = (tickets, filter) => {
    const sorted = tickets.sort((a, b) => a.price - b.price)
    console.log(tickets)
    console.log(sorted)
}
const makeFilter = () => {
    const filter = {
        all: document.querySelector('.all').checked ? true : false,
        without: document.querySelector('.without').checked ? true : false,
        one: document.querySelector('.one').checked ? 1 : false,
        two: document.querySelector('.two').checked ? 2 : false,
        three: document.querySelector('.three').checked ? 3 : false,
    }
    return filter;
}


getData()