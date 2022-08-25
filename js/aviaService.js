import CreateTicket from "./Ticket.js"

class AviaService {
    constructor() {
        this.key = ''
        this.tickets = []
    }

    show = () => {
        console.log(this.key, this.tickets)
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
                // const filter = this.makeFilter()
                // this.transformRes(filter, this.tickets)
                // console.log(this.tickets)
                // this.transformRes(this.tickets)
            }
        }
    }


    sortPrice = (tickets) => {
        // const { all, without, one, two, three } = filter
        // const resultTickets = []
        const sorted = tickets.sort((a, b) => a.price - b.price)
        console.log(tickets)
        console.log(sorted)
    }


    makeFilter = () => {
        const filter = {
            all: document.querySelector('.all').checked ? true : false,
            without: document.querySelector('.without').checked ? true : false,
            one: document.querySelector('.one').checked ? true : false,
            two: document.querySelector('.two').checked ? true : false,
            three: document.querySelector('.three').checked ? true : false,
        }
        return filter;
    }











    // getResource = async (url) => {
    //     let res = await fetch(url)
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url} , status ${res.status}`)
    //     }
    //     return await res.json()
    // }

    // getFilters() {
    //     const filter = {
    //         all: document.querySelector('.all').checked ? true : false,
    //         without: document.getElementById('without').checked ? true : false,
    //         one: document.getElementById('one').checked ? 1 : false,
    //         two: document.getElementById('two').checked ? 2 : false,
    //         three: document.getElementById('three').checked ? 3 : false,
    //     }
    //     console.log(filter)
    //     return filter
    // }


    // getKey = async () => {
    //     const res = await this.getResource('https://front-test.dev.aviasales.ru/search')
    //     // console.log(res)
    //     const key = await res.searchId;
    //     this.getData(key)

    // }

    // getData = async (key) => {
    //     if (key) {
    //         const res = await this.getResource(`https://front-test.dev.aviasales.ru/tickets?searchId=${key}`);
    //         this.transformRes(res)
    //     }


    // }

    // transformRes(data) {
    //     const tickets = data.tickets;
    //     const filter = this.getFilters();




    // }
}


export default AviaService;