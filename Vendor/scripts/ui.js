class UIClass {
    constructor(list) {
        this.list = list
    }
    clear() {
        this.list.innerHTML = '';
    }
    render(data) {
        let when = dateFns.distanceInWordsToNow(
            data.OrderTime.toDate(), { addSuffix: true }
        )
        let html =
            `
            <li class = "list-group-items">
            <span class="message">Verified ID: ${data.VerifiedID}</span>
        </li>
        <li class = "list-group-items">
            <span class="username">${data.Name}</span>
        </li>
        <li class = "list-group-items">
            <span class="message">Order Status: ${data.OrderStatus}</span>
        </li>
        <li class = "list-group-items">
            <span class="message">Roll No: ${data.RollNo}</span>
        </li>
        <li class = "list-group-items">
            <span class="order">Order: ${data.Order.map(item => item.qty)}</span>
            <span class="order">${data.Order.map(item => item.name)}</span>
        </li>
        <li class = "list-group-items">
            <span class="message">Additional Info: ${data.AdditionalInfo}</span>
        </li>
        <li class = "list-group-items">
            <span class="message">Amount Recievable: Rs. ${data.Total}</span>
        </li>
        <li class = "list-group-items">
        <span class="message">Contact No: ${data.ContactNo}</span>
        </li>
        <li class = "list-group-items">
        <span class="message">Email: ${data.Email}</span>
        </li>
        <li class = "list-group-items">
        <span class="message">Department: ${data.Department}</span>
        </li>
        <li class = "list-group-items">
            <div class="time">${when}</div>
        </li>
        <div class="proceed text-center">
            <button data-action="proceed" data-objectid=${data.UserID} class="btn" id="OrderPlaced">Proceed</button>
        </div>
        `
        this.list.innerHTML += html;
    }
}