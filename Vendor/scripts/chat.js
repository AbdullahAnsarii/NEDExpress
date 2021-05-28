const ID = "TnVGBZWrtVVrEdLdNFBXzFQAtp13";
class chatRoom {
    constructor(){
        this.chats = db.collection('orders');
    }
    async addChat(message){
        //let now = new Date();
        // let chat = {
        //     message: message,
        //     username: this.username,
        //     room: this.room,
        //     created_at: firebase.firestore.Timestamp.fromDate(now) 
        // }
        let response = await this.chats.doc(ID).update({
            OrderStatus: message
        });
        return response
    }
    getOrders(callback){
        db.collection('orders')
        .where('OrderStatus', '==', 'OrderPlaced')
        .orderBy("OrderTime")
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change => {
                if(change.type === "added"){
                    callback(change.doc.data())
                }
            })
        })
    }
}
const chatroom = new chatRoom();
chatroom.getOrders((data)=>{
    console.log(data)
})
chatroom.addChat('Approved')
.then(()=> console.log("chat added"))
.catch(err => console.log(err))