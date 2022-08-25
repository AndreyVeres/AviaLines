import CreateTicket from "./Ticket.js"

class AviaService {
    constructor() {
        this.key = ''
        this.tickets = []
    }



    getkey = async () => {
        this.tickets = []
        const res = await fetch('https://front-test.dev.aviasales.ru/search')
            .then(res => res.json())
            .then(res => this.key = res.searchId)

        this.getTickets()


    }

    getTickets = async () => {
        const response = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${this.key}`)
        if (response.status === 502 || response.status === 500) {
            await this.getTickets()
        } else if (response.status !== 200) {
            console.error(response.statusText)
            await this.getTickets();
        } else {
            let ticketsPart = await response.json()
            this.tickets = [...this.tickets, ...ticketsPart.tickets]
            if (!ticketsPart.stop) {
                await this.getTickets()
            } else {
                const data = this.tickets
                return data
                console.log(this.tickets)
                // const filter = this.makeFilter()
                // const sortedTickets = this.sortStops(this.tickets, filter)
                // console.log(sortedTickets)
                // sortedTickets.forEach(item => {
                //     new CreateTicket(item)
                // })
            }
        }
    }



    sortStops = (filter, tickets) => {
        console.log(filter)
        return tickets.filter(item => {
            return item.segments[0].stops.length === filter
        }).slice(0, 5)
    }
    sortPrice = (tickets, filter) => {
        const sorted = tickets.sort((a, b) => a.price - b.price)
        console.log(tickets)
        console.log(sorted)
    }


    makeFilter = () => {
        const filter = {
            all: document.querySelector('.all').checked ? true : false,
            without: document.querySelector('.without').checked ? true : false,
            one: document.querySelector('.one').checked ? 1 : false,
            two: document.querySelector('.two').checked ? 2 : false,
            three: document.querySelector('.three').checked ? 3 : false,
        }
        return filter;
    }

}


export default AviaService;