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
            priceStart: document.querySelector('.priceStart').value,
            priceEnd: document.querySelector('.priceEnd').value
        }
        return filter
    }


    getKey = async () => {
        const res = await this.getResource('https://front-test.dev.aviasales.ru/search')
        const key = await res.searchId;
        this.getData(key)
    }

    getData = async (key) => {
        const res = await this.getResource(`https://front-test.dev.aviasales.ru/tickets?searchId=${key}`);
        this.transformRes(res)
    }

    transformRes(data) {
        const filter = this.getFilters()

        const tickets = data.tickets;
        const filtered = tickets.filter(item => {
            // item.price >= filter.priceStart && item.price <= filter.priceEnd 

            return item.price > filter.priceStart
            // return item.carrier === 'EK'
        })
        return tickets.forEach(ticket => {
            // CreateTicket(item)
            new CreateTicket(ticket).render()
        })

        console.log(filtered)

    }

}


export default AviaService;