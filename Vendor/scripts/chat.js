const ID = "TnVGBZWrtVVrEdLdNFBXzFQAtp13";
class chatRoom {
    constructor(room){
        this.chats = db.collection('orders');
        this.room = room;
        this.unsub;
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
        this.unsub = db.collection('orders')
        .where('OrderStatus', '==', this.room)
        .orderBy("OrderTime")
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change => {
                if(change.type === "added"){
                    callback(change.doc.data())
                }
            })
        })
    }
    updateRoom(room){
        this.room = room;
        console.log("room updated");
        if(this.unsub){
            this.unsub();
        }

    }
    
}
// const chatroom = new chatRoom("OrderPlaced");
// chatroom.getOrders((data)=>{
//     console.log(data)
// })
// chatroom.addChat('Approved')
// .then(()=> console.log("chat added"))
// .catch(err => console.log(err))