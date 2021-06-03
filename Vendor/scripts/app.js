let orderList = document.querySelector(".order-list");
let rooms = document.querySelector('.order-rooms');
let roomIdentifier = document.querySelector("h4");
let proceed = document.querySelector(".proceed");

rooms.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    uiClass.clear();
    orderroom.updateRoom(e.target.getAttribute('id'));
    orderroom.getOrders(chat => uiClass.render(chat));
    roomIdentifier.innerText = `${e.target.getAttribute('id')}`
  }
});

const uiClass = new UIClass(orderList);
const orderroom = new orderRoom("Placed");

orderroom.getOrders(data => uiClass.render(data));

orderList.addEventListener("click", function (event) {
  if (event.target.dataset.action === "proceed") {
    if (event.target.tagName === 'BUTTON') {
      console.log(event.target.dataset.objectid)
      if(orderroom.room === "Placed"){
        orderroom.changeOrderStatus("Approved", event.target.dataset.objectid);
      }
      else if(orderroom.room === "Approved"){
        orderroom.changeOrderStatus("Shipped", event.target.dataset.objectid);
      }
      else if(orderroom.room === "Shipped"){
        orderroom.changeOrderStatus("Completed", event.target.dataset.objectid);
      }
      else if(orderroom.room === "Completed"){
        //orderroom.storeOrder(event.target.dataset.objectid, data);
      }
    }
  }
});