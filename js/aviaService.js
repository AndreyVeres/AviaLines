import CreateTicket from "./Ticket.js"

class AviaService {

    getResource = async (url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} , status ${res.status}`)
        }
        return await res.json()
    }

    getFilters() {
        const filter = {
            all: document.querySelector('.all').checked ? true : false,
            without: document.getElementById('without').checked ? true : false,
            one: document.getElementById('one').checked ? true : false,
            two: document.getElementById('two').checked ? true : false,
            three: document.getElementById('three').checked ? true : false,
        }
        return filter


    }


    getKey = async () => {
        const res = await this.getResource('https://front-test.dev.aviasales.ru/search')
        console.log(res)
        const key = await res.searchId;

        this.getData(key)

    }

    getData = async (key) => {
        const res = await this.getResource(`https://front-test.dev.aviasales.ru/tickets?searchId=${key}`);
        this.transformRes(res)

    }

    transformRes(data) {
        const tickets = data.tickets;
        const filter = this.getFilters();
        // console.log(tickets)
        const filteredTickets = tickets.filter(item => {
            if (filter.one) {
                return item.segments[0].stops.length === 1
            }
        })

        console.log(filteredTickets)
    }
}


export default AviaService;