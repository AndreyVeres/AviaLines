class CreateTicket {
    constructor(ticket) {
        this.price = ticket.price  // price
        this.timeTo = ticket.segments[0].duration //время туда в минутах
        this.timeFrom = ticket.segments[1].duration // в минутах

        // this.time = this.getTime(ticket.segments[0].date)
        this.dateTo = ticket.segments[0].date
        this.dateFrom = ticket.segments[1].date

    }

    getTime(date, duration) {
        let durationTimeInMiliseconds = duration * 60000
        let startHours = this.addZero(new Date(date).getHours())
        let startMinutes = this.addZero(new Date(date).getMinutes())
        let finishHours = this.addZero(new Date(new Date(date).getTime() + durationTimeInMiliseconds).getHours())
        let finishMinutes = this.addZero(new Date(new Date(date).getTime() + durationTimeInMiliseconds).getMinutes())
        
        return `${startHours} : ${startMinutes} - ${finishHours} : ${finishMinutes}`

        // return ` ${new Date(date).getHours()} :  ${new Date(date).getMinutes()} -
        //          ${new Date(new Date(date).getTime() + durationTimeInMiliseconds).getHours()} : ${new Date(new Date(date).getTime() + durationTimeInMiliseconds).getMinutes()} `

    }

    addZero(number) {
        return number <= 9 ? '0' + number : number
    }
    getDuration(time) {
        let hours = Math.trunc(time / 60)
        let mins = time % 60
        return `${hours}ч , ${mins}м`
    }

    render() {
        let div = document.createElement('div')
        div.innerHTML = ` 
         <div class="ticket">
                        <div class="ticket__top">
                            <p class="ticket__price">${this.price + ' ' + 'P'} </p>
                            <img src="#" alt="company" class="company">
                        </div>
                        <div class="ticket__info">
                            <div class="ticket__box">
                                <h6 class="ticket__box-title date__start">MOW - HKT</h6>
                                <p class="ticket__box-descr time__start">${this.getTime(this.dateTo, this.timeTo)}</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title">В пути</h6>
                                <p class="ticket__box-descr walkTime__start">${this.getDuration(this.timeTo)}</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title stops__start">Пересадки</h6>
                                <p class="ticket__box-descr">HKG , JNB</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title date__back">MOW - HKT</h6>
                                <p class="ticket__box-descr time__back">${this.getTime(this.dateFrom, this.timeFrom)}</p>
                            </div>
                            <div class="ticket__box">
                                <h6 class="ticket__box-title">В пути</h6>
                                <p class="ticket__box-descr walkTime__back">${this.getDuration(this.timeFrom)}</p>
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