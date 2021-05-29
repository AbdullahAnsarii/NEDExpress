class UIClass {
    constructor(list){
        this.list = list
    }
    // orderItem(order){
    //     order.map(item => {
    //         this.list.innerHTML += 
    //         `
    //         <li class = "list-group-items">
    //         <span class="message">${item.name}</span>
    //         </li>
    //         `
    //     })
    //     //console.log(order)
    // }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        let when = dateFns.distanceInWordsToNow(
            data.OrderTime.toDate(), {addSuffix: true}
        )
        let html =
        `
        <li class = "list-group-items">
            <span class="username">Name: ${data.Name}:</span>
            <span class="message">Order Status: ${data.OrderStatus}</span>
            <span class="message">${data.Order.map(item => item.name)}</span>
            <div class="time">${when}</div>
        </li>

        `
        this.list.innerHTML += html;
    }
}