class CreateTicket {
    constructor(ticket) {
        this.price = ticket.price
        
    }

    render() {
        let div = document.createElement('p')
        div.textContent = this.price
        document.querySelector('.ticket').append(div)

    }
}

export default CreateTicket