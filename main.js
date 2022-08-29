
const checkboxParent = document.querySelector('.forn')
let result;
checkboxParent.addEventListener('click', async (e) => {

    if (e.target.getAttribute('data-filter')) {
        const filter = e.target.getAttribute('data-filter')
        let price = sortStops(filter, result)

        console.log(price)
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
                // console.log(data)
                result = data
                // console.log(result)
            }


        }
    }
    getkey()



}




const sortStops = (filter, tickets) => {
    console.log(filter)
    return tickets.filter(item => {
        return item.segments[0].stops.length === filter
    }).slice(0, 5)
}
const sortPrice = (tickets, filter) => {
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
// let data


