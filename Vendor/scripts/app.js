const chatList = document.querySelector(".chat-list");

const uiClass = new UIClass(chatList);
const chatroom = new chatRoom("OrderPlaced");

chatroom.getOrders(data => uiClass.render(data));