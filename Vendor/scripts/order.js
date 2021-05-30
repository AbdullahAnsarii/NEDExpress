class orderRoom {
    constructor(room){
        this.chats = db.collection('orders');
        this.room = room;
        this.unsub;
    }
    async changeOrderStatus(status, ID){
        let response = await this.chats.doc(ID).update({
            OrderStatus: status
        });
        return response
    }
    async getOrders(callback){
        this.unsub = await this.chats
        .where('OrderStatus', '==', this.room)
        .orderBy("OrderTime")
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change => {
                if(change.type === "added" || change.type === "modified"){
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
// const chatroom2 = new chatRoom("OrderPlaced");
// // chatroom.getOrders((data)=>{
// //     console.log(data)
// // })
// chatroom2.changeOrderStatus('Approved')
// .then(()=> console.log("chat added"))
// .catch(err => console.log(err))