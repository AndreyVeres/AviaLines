import CreateTicket from "./Ticket.js"

class AviaService {
    constructor() {
        this.key = ''
        this.tickets = []
    }


    getkey = async () => {
        const res = await fetch('https://front-test.dev.aviasales.ru/search')
            .then(res => res.json())
            .then(res => this.key = res.searchId)
    }

    getTickets = async () => {
        const response = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${this.key}`)

        if (response.status === 502 || response.status === 500) {
            await this.getTickets()
        } else if (response.status !== 200) {
            console.error(response.statusText)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await this.getTickets();
        } else {
            let ticketsPart = await response.json()
            this.tickets = [...this.tickets, ...ticketsPart.tickets]
            if (!ticketsPart.stop) {
                await this.getTickets()
            } else {
                console.log(this.tickets)
                console.log(ticketsPart)
            }
        }

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