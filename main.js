getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Could not fetch ${url} , status ${res.status}`)
    }
    return await res.json()
}


getKey = async () => {
    const res = await getResource('https://front-test.dev.aviasales.ru/search')
    const key = await res.searchId;
    getData(key)
}

getData = async (key) => {
    const res = await this.getResource(`https://front-test.dev.aviasales.ru/tickets?searchId=${key}`);
    transformRes(res)
}

function transformRes(data) {
    const filter = getFilters()
    
    const tickets = data.tickets;
    const filtered = tickets.filter(item => {
        // item.price >= filter.priceStart && item.price <= filter.priceEnd
        return item.price > filter.priceStart
        // return item.carrier === 'EK'
    })
    console.log(filtered)
    // console.log(tickets)


}

function getFilters (){
    const filter = {
        priceStart : document.querySelector('.priceStart').value ,
        priceEnd : document.querySelector('.priceEnd').value
    }
    return filter
}




const btn = document.querySelector('.btn')
btn.addEventListener('click', getKey)



