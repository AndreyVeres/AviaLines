class CreateTicket {
    constructor(ticket) {
        this.price = ticket.price
        this.duration = ticket.segments[0].duration
    }

    render() {
        let div = document.createElement('div')
        div.innerHTML = ` 
         <div class="ticket">
                        <div class="ticket__top">
                            <p class="ticket__price">${this.price}</p>
                            <img src="#" alt="company" class="company">
                        </div>
                        <div class="ticket__info">
                            <div class="ticket__box">
                                <h6 class="ticket__box-title date__start">MOW - HKT</h6>
                                <p class="ticket__box-descr time__start">10:45 - 08:00</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title">В пути</h6>
                                <p class="ticket__box-descr walkTime__start">21:51</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title stops__start">Пересадки</h6>
                                <p class="ticket__box-descr">HKG , JNB</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title date__back">MOW - HKT</h6>
                                <p class="ticket__box-descr time__back">10:45 - 08:00</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title">В пути</h6>
                                <p class="ticket__box-descr walkTime__back">21:51</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title stops__back">Пересадки</h6>
                                <p class="ticket__box-descr">HKG , JNB</p>
                            </div>
                        </div>
                    </div>
                    `
        document.querySelector('.tickets__list').append(div)
    }
}

export default CreateTicket